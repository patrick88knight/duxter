import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./features/user/user-slice"
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(combineReducers({
    user: userReducer
}), composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store