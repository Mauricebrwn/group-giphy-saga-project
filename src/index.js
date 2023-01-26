import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
// Import the Sagas stuff:
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import App from './components/App/App';



function* rootSaga() {
    yield takeEvery('???', unKnown)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({ unKnown }),
    applyMiddleware(logger, sagaMiddleware)
  );

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
