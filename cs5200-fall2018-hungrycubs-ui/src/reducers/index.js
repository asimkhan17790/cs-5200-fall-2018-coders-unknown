import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import currentUser from './LoginSignupReducer';
const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  currentUser

});

export default rootReducer;
