import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // course: Object.assign({}, props.course),
      course: Object.assign({}, this.props.course), // lifecycle method component will receive props
      errors: {},
      // since this is fleeting data it should exist in local state because the rest of the has no need for it
      // it could go through redux flow but would be unnecessary overhead
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // this lifecycle method component is called anytime that props have changed or react thinks they might have changed
  componentWillReceiveProps(nextProps) {
    // this checks to see if courseId has changed.  if it runs all the time it would end up overriding our state
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    // because all form field has a name we can update the corresponding value in state using a singe change handler
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving:true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving:false});
      });
    // .then is delaying the next step until the first call finishes
    // redirect wont get called until the redirect promise is resolved
  }

  redirect() {
    this.setState({saving:false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }
  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
//to set up the context we need to declare it
//since context types is static property it has to be placed after the class definitions
//logical place to put it is after the prop types
ManageCoursePage.contextTypes = {
  //this is being declared as optional to avoid a linting warning while testing
  router: PropTypes.object
};

function getCourseById(courses, id) {
  //debugger;
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}
// this is where we translate the shape or transform the data from what the api returns
// to something useful for populating the component
function mapStateToProps(state, ownProps) {
  // debugger;  pause here some time to see what all is available in ownProps
  const courseId = ownProps.params.id; // from the path `/course/:id` - this was defined by us in routes.js

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }


  // to aid in testing and any other reason we are moving the authorsFormattedForDropdown
  // to  ./selectors/selectors and modifying it slightly
  // map fields from author to fields available in the SelectInput dropdown
  /*const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });*/

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
