# Handler Middleware

A simple middleware that fills the gap between be as powerful as Sagas or Observables, and being limited by thunks.

### Usage

```js
import * as actions from './actions';

const middleware = createHandlerMiddleware({
  [actions.ACTION_TYPE]: (action, state) => {
    // React to action here
  }
});

// For registering actions after the store has already been created
middleware.registerHandlerMap({
  [actions.ACTION_TYPE]: (action, state) => {
    // React to action here
  }
});
```
