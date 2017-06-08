import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(rootReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
// applyMiddleware is optional but useful for - ie add support for hot reloading or redux dev tools extension in chrome
// logging, scheduling action and  sending crash reports when issues occur are just some of the actions that can be placed in middleware
// check react slingshot for how to configure these other middleware items
