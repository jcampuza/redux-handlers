import { Action, AnyAction, Middleware, MiddlewareAPI } from 'redux';

export interface ActionHandler<A extends Action = AnyAction> {
  (action: A, store: MiddlewareAPI): void;
}

export type ActionHandlerMap = Record<string, ActionHandler>;

export type CombinedActionHandlerMap = Record<string, ActionHandler[]>;

/**
 * Middleware for listening to dispatched actions and "Handling" them with side effects
 * Essentially a simpler version of effects/sagas (i.e. redux-observable/Saga)
 */
export const createHandlerMiddleware = (...actionHandlerMaps: Array<ActionHandlerMap>) => {
  const combinedHandlers: CombinedActionHandlerMap = {};
  const registerHandlerMap = (handlerMap: ActionHandlerMap) => {
    for (const [actionType, actionHandler] of Object.entries(handlerMap)) {
      if (combinedHandlers[actionType]) {
        combinedHandlers[actionType].push(actionHandler);
      } else {
        combinedHandlers[actionType] = [actionHandler];
      }
    }
  };

  for (const actionHandlerMap of actionHandlerMaps) {
    registerHandlerMap(actionHandlerMap);
  }

  const middleware: Middleware = store => next => action => {
    const processedAction = next(action);

    if (!processedAction) {
      return processedAction;
    }

    const handlersForAction = combinedHandlers[processedAction.type];

    if (!handlersForAction) {
      return processedAction;
    }

    handlersForAction.forEach(handler => handler(processedAction, store));
    return processedAction;
  };

  return { middleware, registerHandlerMap };
};
