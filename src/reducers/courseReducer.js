import * as types from '../actions/actionTypes';

// this is not required but it is helpful and minimizes potential typos
// this it defines what the store looks like to anyone coming into the project
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  // can use if statement, lookup table of functions or completely obstruct via another function
  // why use switch
  // it is the simplest easiest to read and follow
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];
    case types.UPDATE_COURSE_SUCCESS:
      return [
        // here we are getting a list of all courses except for the one that we are updating
        // creating a new array out of the filtered results then use object.assign to create
        // a copy of the course passed in and in include it in the returned array
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];
    /*
    case types.EXAMPLE
      //debugger;
      // return [...state, Object.assign({}, action.course)];  // ... is ES6 spread operator spreads the array or explodes all values inside the array just as though they were typed out here; ...state returns a new instance of the state array // then Object.assign creates a deep copy of state
    */
    default:
      return state;
  }
}
