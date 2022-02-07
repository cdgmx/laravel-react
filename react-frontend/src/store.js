import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {userLoginReducer, userLogoutReducer, userRegisterReducer,userListReducer} from './reducers/userReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer
    
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ?JSON.parse(localStorage.getItem('userInfo'))
    : null; //rehydrate the userInfo from localStorage

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}, //set initial state for userLogin
};

const middleware = [thunk]; // add the thunk middleware
const store = createStore(reducer, initialState, applyMiddleware(...middleware)); //create the store
export default store;