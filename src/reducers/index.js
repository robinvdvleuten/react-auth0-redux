import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth0 from './auth0';
import user from './user';

export default combineReducers({
  auth0,
  user,
  routing: routerReducer
});
