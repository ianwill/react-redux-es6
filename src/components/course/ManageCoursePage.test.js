import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
// using a named import for {ManageCoursePage} to reference class ManageCoursePage on line 8
// instead of the connected class that is exported by default, bottom of ManageCoursePage page
import {ManageCoursePage} from './ManageCoursePage';

describe ('Manage Course Page', () => {
  it('sets error message upon blur of empty title field', () => {
    const props = {
      authors: [],
      // these functions were defined in the mapDispatchToProps function
      // all actions were being passed under a property named actions
      // we can use a simple mock to pass the function
      actions: { saveCourse: () => { return Promise.resolve(); }},
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    };
    // this example uses mount instead of shallow because we need to test interactions with its child component
    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit'); //assure we found the submit.

    // simulate a call or click
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
