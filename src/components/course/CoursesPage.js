// named imports are contained with {}
// an example below would be {connect}

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

/* 5 major pieces of a container page */
/* 1. Constructor where we initialize state and do any bindings*/
class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

 /**
  *
  * // bind functions to 'this' of the CoursesPage
  // binding should be done in constructor for performance
  // binding could be done in render on the input but it would create a bind and render with each key press instead of once
  // avoid defining new functions in render function
  this.state = {
      course: { title: "" }
    };
  this.onTitleChange = this.onTitleChange.bind(this);
  this.onClickSave = this.onClickSave.bind(this);


  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    // since we are using bindActionCreators we need to access the prop under actions
    this.props.actions.createCourse(this.state.course);
    /// cleaner approach that should have been introduced first ///
    // this.props.createCourse(this.state.course);
    /// because we didn't map an event for this in mapDispatchToProps ///
    // connect will inject a dispatch prop for us
    // it is the function we need to call to fire off an action that redux will handle
    // this is the god awful way of dispatching an action that I had already written out
    // because this guy like to waste time and lead you one way to then completely change to the correct way
    // thus painting a blurry picture and wasting time as I must go back and rewrite the code correctly
    // why don't you show the correct/better way first so it can be understood clearly and concisely
    // then while you talk about the alternative way I can observe and see instead of saying
    //  fuck now wait don't do what I was just taught, do this
    //// this.props.dispatch(courseActions.createCourse(this.state.course)); ////
  }

  <h2>Add Course</h2>
  <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />
  <input type="submit" value="Save" onClick={this.onClickSave}  />

**/
/* 2. Child functions */
  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  // this is best practice for performance and should be used instead of an arrow function
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  /* 3. render - typically we would call a child component but for simplification markup was done inline */
  render() {
    //defining courses as a constant allows us to simplify the reference to it keeping it nice and short
    // this will make things easier as more items are added
    // <CourseList courses={this.props.courses}/> becomes  <CourseList courses={courses}/>
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses}/>
      </div>
      /* this is jsx
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input type="text" onChange={this.onTitleChange} value={this.state.course.title} />

        <input type="submit" value="Save" onClick={this.onClickSave}  />
      </div>
      this is jsx */
    );
  }
}


/* 4. propTypes - they provide validation */
// validation
// needed for props defined in this file - this.props.dispatch and this.props.courses
/* because we didn't map an event for this in mapDispatchToProps */
// dispatch: PropTypes.func.isRequired,
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/* 5. connect to redux */
// we are exposed properties on the component
// defining courses here allows us to access the courses by saying this.props.courses
// in the render function above
// the state property in this case 'courses' is determined by the value set in the root reducer
// state in function param represents the state within our redux store
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

// optional second param of connect function below  connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// defines what actions are exposed on component
// in this use case these actions would be defined as functions in ../../actions/courseActions
// => is an arrow function you can omit parenthesis for arguments when there is a single parameter
function mapDispatchToProps(dispatch) {
  return {
    // redux helper function - goes through course actions and find all actions in file and wrap them in a call to dispatch
    // this pattern helps separate concerns
    // reduces amount of work need to map dispatch to props
    actions: bindActionCreators(courseActions, dispatch)
    // simplifies process and eliminates need to create an map here for each of the actions
   // createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

// export component that is decorated by react/redux connect function
// two parentheses are just two functions beside each other
// connect returns a function and immediately calls the second function
// it eliminates the need to create an intermediate variable
// allowing us to take the result of one function and pass it on to the next function
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// instead of a plain component
// export default CoursesPage;
