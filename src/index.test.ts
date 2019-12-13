import { createStore, applyMiddleware } from 'redux';
import { createHandlerMiddleware } from '.';

describe('handler middleware', () => {
  it('should register a handler that triggers when a matching action is called', () => {
    const handler = jest.fn();
    const middleware = createHandlerMiddleware();

    middleware.registerHandler('action', handler);

    const store = createStore(() => ({}), applyMiddleware(middleware.middleware));

    store.dispatch({ type: 'action' });

    expect(handler).toHaveBeenCalled();
  });

  it('should register multiple handlers of the same action', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    const middleware = createHandlerMiddleware();

    middleware
      .registerHandler('action', handler1)
      .registerHandler('action', handler2)
      .registerHandler('action', handler3);

    const store = createStore(() => ({}), applyMiddleware(middleware.middleware));

    store.dispatch({ type: 'action' });

    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).toHaveBeenCalled();
  });

  it('should ignore non matching actions', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const middleware = createHandlerMiddleware();

    middleware.registerHandler('action', handler1).registerHandler('action2', handler2);

    const store = createStore(() => ({}), applyMiddleware(middleware.middleware));

    store.dispatch({ type: 'action3' });

    expect(handler2).not.toHaveBeenCalled();
  });

  it('should ignore actions that do not have a type', () => {
    const handler1 = jest.fn();
    const middleware = createHandlerMiddleware();

    middleware.registerHandler('action', handler1).registerHandler('action2', handler1);

    const store = createStore(() => ({}), applyMiddleware(middleware.middleware));

    store.dispatch({ type: '' });

    expect(handler1).not.toHaveBeenCalled();
  });
});
