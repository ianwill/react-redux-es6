//this is an integration test that confirms all pieces are working together correctly
import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('store', function () {
    it('Shoud handle creating courses', function () {
      // arange
      const store = createStore(rootReducer, initialState);
      const course = {
        title: "Clean Code"
      };

      // act or action
      // Could dispatch multiple actions here and assert on result
      const action = courseActions.createCourseSuccess(course);
      store.dispatch(action);

      // assert
      const actual = store.getState().courses[0];
      const expected = {
        title: "Clean Code"
      };

      // actual and expected are teh constants defined above
      expect(actual).toEqual(expected);

    });
});
