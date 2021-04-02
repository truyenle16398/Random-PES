import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// Redux: Store
const store = createStore(
    rootReducer,
    applyMiddleware(
        sagaMiddleware,
    ),
);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

export {
    store,
}