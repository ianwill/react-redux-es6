// traditionally root reducer is named index.js
import {combineReducers} from 'redux';
import courses from './courseReducer';  // because it is exported defaulted it can be aliased anyway we want, in this case we have aliased it as 'courses'
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  // this property is an object that will be referenced throughout the application

  courses,  // the name supplied to this property will impact how the state is accessed through out the application
  /* ^
   // this is the ES6 shorthand property name
   // since left and right have same we don't have to map courses to courses ie courses: courses
   // another example could be courses: altCourse
   */
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
