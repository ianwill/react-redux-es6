import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

// describe the file we are about to test
describe('Course Reducer', () => {
  // name the test
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange - just specify data needed in this case we are adding course , essentially appending an item to a string
    const initialState = [
      // A and B are existing courses
      {title: 'A'},
      {title: 'B'}
    ];

    // C is a new course
    const newCourse = {title: 'C'};

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    // arrange  - just specify data needed in this case we need the title and an id so we know which field we are updating
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];

    const course = {id: 'B', title: 'New Title'};
    const action = actions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);
    const untouchedCourse = newState.find(a => a.id == 'A');

    // assert
    expect(updatedCourse.title).toEqual('New Title');
    expect(untouchedCourse.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});
