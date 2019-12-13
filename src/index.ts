import { Action, AnyAction, Middleware, MiddlewareAPI } from 'redux';

export interface ActionHandler<A extends Action = AnyAction> {
  (action: A, store: MiddlewareAPI): void;
}

type CombinedActionHandlerMap = Record<string, ActionHandler[]>;

/**
 * Middleware for listening to dispatched actions and "Handling" them with side effects
 * Essentially a simpler version of effects/sagas (i.e. redux-observable/Saga)
 */
export const createHandlerMiddleware = () => {
  const combinedHandlers: CombinedActionHandlerMap = {};

  // Individually registered handlers can be disposed/unsubscribed
  const registerHandler = (actionType: string, actionHandler: ActionHandler) => {
    if (combinedHandlers[actionType]) {
      combinedHandlers[actionType].push(actionHandler);
    } else {
      combinedHandlers[actionType] = [actionHandler];
    }

    return { registerHandler };
  };

  const middleware: Middleware = store => next => action => {
    const dispatchedAction = next(action);

    if (!dispatchedAction || !dispatchedAction.type) {
      return dispatchedAction;
    }

    const handlersForAction = combinedHandlers[dispatchedAction.type];

    if (!handlersForAction) {
      return dispatchedAction;
    }

    for (const handler of handlersForAction) {
      handler(dispatchedAction, store);
    }

    return dispatchedAction;
  };

  return { middleware, registerHandler };
};
