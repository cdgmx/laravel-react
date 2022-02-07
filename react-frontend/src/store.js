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
    : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
};

const middleware = [thunk];
const store = createStore(reducer, initialState, applyMiddleware(...middleware));
export default store;