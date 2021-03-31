import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, composeEnhancers);

export default store;

sagaMiddleware.run(rootSaga);
