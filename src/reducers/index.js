import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import session from './session';
import user from './user';

export default combineReducers({
  session,
  user,
  routing: routerReducer
});
