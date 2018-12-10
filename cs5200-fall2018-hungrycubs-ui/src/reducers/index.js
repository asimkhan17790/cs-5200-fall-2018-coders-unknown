import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import currentUser from './LoginSignupReducer';
import homePageData from './homePageReducer';
import menuPageData from './menuPageReducer';
const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  currentUser,
  homePageData,
  menuPageData
});

export default rootReducer;
