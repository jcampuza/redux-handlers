# Handler Middleware

A simple middleware that fills the gap between be as powerful as Sagas or Observables, and being limited by thunks.

### Usage

```js
import * as actions from './actions';
import { createStore, applyMiddleware } from 'redux';

const { middleware, registerHandlerMap } = createHandlerMiddleware({
  [actions.ACTION_TYPE]: (action, store) => {
    // React to action here
  }
});

const store = createStore(() => ({}), applyMiddleware(middleware));

// For registering actions after the store has already been created
middleware.registerHandlerMap({
  [actions.ACTION_TYPE]: (action, store) => {
    // React to action here
  }
});
```
