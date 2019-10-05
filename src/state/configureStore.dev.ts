import { applyMiddleware, createStore, Store } from "redux";
import { createLogger } from "redux-logger";
import { ApplicationState, rootReducer, rootSaga } from "./ducks/index";
import sagaMiddleware from "./middlewares/sagas";

export default function configureStore(
  initialState: ApplicationState
): Store<ApplicationState> {
  const logger = createLogger();
  const middlewares = applyMiddleware(sagaMiddleware, logger);
  const store = createStore(rootReducer, initialState, middlewares);

  sagaMiddleware.run(rootSaga);

  return store;
}
