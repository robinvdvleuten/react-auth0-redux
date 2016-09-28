import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth0 from './auth0';

export default combineReducers({
  auth0,
  routing: routerReducer
});
