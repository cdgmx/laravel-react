import axios, { Axios } from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from "../constants/userConstants";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(`/api/login`, { email, password });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const userLogout = () => async (dispatch,getState) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });

    const {
        userLogin: {userInfo},
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.post("/api/logout", {}, config);
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.message });
  }
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
   
    const { data } = await axios.post(
      `/api/register`,
      { name, email, password },
    )


    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.validation_errors });
  }
};

export const listUsers = () => async (dispatch,getState) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });


        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
            Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`,config);

        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
};


