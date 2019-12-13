# Handler Middleware

A simple middleware that fills the gap between be as powerful as Sagas or Observables, and being limited by thunks.

### Usage

```js
import * as actions from './actions';
import { createStore, applyMiddleware } from 'redux';

const { middleware, registerHandler } = createHandlerMiddleware();

const store = createStore(() => ({}), applyMiddleware(middleware));

/**
 *  register actions to handle
 */
middleware.registerHandler(actions.ACTION_TYPE, (action, store) => {
  // some logic here
});

const createLogger = str => () => console.log(str);

/**
 * registerHandler can also be chained
 */
middleware
  .registerHandler(actions.ACTION_TYPE_ONE, createLogger('one'))
  .registerHandler(actions.ACTION_TYPE_TWO, createLogger('two'))
  .registerHandler(actions.ACTION_TYPE_THREE, createLogger('three'));

store.dispatch({ type: actions.ACTION_TYPE_ONE });
// -> 'one'

/**
 * actions can be registered multiple times to handle the same action in different ways
 */
middleware
  .registerHandler(actions.ACTION_TYPE, createLogger('one'))
  .registerHandler(actions.ACTION_TYPE, createLogger('two'))
  .registerHandler(actions.ACTION_TYPE, createLogger('three'));

store.dispatch({ type: actions.ACTION_TYPE });
// -> 'one'
// -> 'two'
// -> 'three'
```
