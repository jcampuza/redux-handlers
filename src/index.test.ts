import { createStore, applyMiddleware } from "redux";
import { createHandlerMiddleware } from ".";

describe("handler middleware", () => {
  it("should register handlers that trigger when a matching action is called", () => {
    const handler = jest.fn();
    const middleware = createHandlerMiddleware({
      action: handler
    });

    const store = createStore(
      () => ({}),
      applyMiddleware(middleware.middleware)
    );

    store.dispatch({ type: "action" });

    expect(handler).toHaveBeenCalled();
  });

  it("should be able to register handlers after creation", () => {
    const handler = jest.fn();
    const middleware = createHandlerMiddleware({});

    const store = createStore(
      () => ({}),
      applyMiddleware(middleware.middleware)
    );

    middleware.registerHandlerMap({
      action: handler
    });

    store.dispatch({ type: "action" });

    expect(handler).toHaveBeenCalled();
  });
});
