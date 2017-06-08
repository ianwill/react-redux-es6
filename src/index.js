/*********
 *
 * boilerplate Redux configuration
 * ALL notes and detailed explanations are in the courses files.  including breakdowns of functions and the who what where and why
 *
 *********/
/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore.dev';
import  {Provider} from 'react-redux'; // this is a higher order component that attaches our store to react container components
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // min stands for minified  ie minified  css
import '../node_modules/toastr/build/toastr.min.css';

// create an instance of the store
// optionally we could pass initial state to the store
// if this were a server rendered app we would probably want to pass the initial state
// you would do this also if you wanted to rehydrate your store using a separate state
// from the server or that's stored in local storage
const store = configureStore();
// this requires no server rendering
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

/**
could be done by injecting jSon into head of index.html via a server render
**/
render(
  // wrap router with provider to connect to the redux store
  <Provider store={store} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

/**
 * npm start -s 
 *
 * to begin a test the session run
 * npm run test:watch
 *
 * note: new tests files will not be picked automatically
 * you will need to exit by hitting Ctrl + c to terminate
 * then rerun the command to include the new test file
 *
 * if that does not work run: taskkill /F /IM node.exe
 *
**/
