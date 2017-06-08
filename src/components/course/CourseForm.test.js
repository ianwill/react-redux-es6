import expect from 'expect';
import React from 'react';
// named imports for mount and shallow
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

// setup function added for convenience
function setup(saving) {
  const props = {
    allAuthors: [],
    course: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {

 // expect to
  it('renders form and h1', () => {
    // get a reference to wrapper
    const wrapper = setup(false);

    /* first item in chain */
    // find('form').length  - I expect to find a form
    /* second item in the chain */
    // .toBe(1)  - and I expect there to only find one form
    expect(wrapper.find('form').length).toBe(1);
    //  find('h1').text()).toEqual('Manage Course') reads the
    // data between the opening and closing h1 making sure it says 'Manage Course'
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    // get a reference to wrapper
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    // get a reference to wrapper
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
