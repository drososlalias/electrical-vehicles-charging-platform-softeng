import { createStore , applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const initialState = {} ; 

const middleware = [thunk];

const store = createStore(
    allReducers ,
    initialState , 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
