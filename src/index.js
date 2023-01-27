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

const favoriteList = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITELIST':
      return  action.payload 
    default:
      return state;
  }
};

function* fetchFavorites() {
  try {
      // GET THE FRUIT FROM THE SERVER!
      const response = yield axios({
          method: 'GET',
          url: '/api/favorite'
      })

      // WOOT. HERE'S THE FRUIT:
      const favoriteDB = response.data
      console.log(favoriteDB);
      // WOO! NOW, PUT THAT FRUIT IN THE
      // basketReducer:
      yield put({
          type: 'SET_FAVORITELIST',
          payload: favoriteDB
      })
  } catch (error) {
      console.log('fetchPlants error:', error)
  }
}

function* addToFavorites(action){
  try{
    const addFavorite = action.payload

    const response = yield axios({
      method: 'POST',
      url: '/api/favorite',
      data: addFavorite
    })
    yield put ({
      type: 'SAGA/FETCH_FAVORITES'
    }) 
  }catch (error){
      console.log('createPlant error:', error)
  }
}

function* updateCategory (action){
  
  try{
    const category = action.payload

    const response = yield axios({
      method: 'PUT',
      url: `/api/favorite/${category}`,
    })
    yield put ({
      type: 'SAGA/FETCH_PLANTS'
    }) 
  }catch (error){
      console.log('deletePlant error:', error)
  }
}



function* rootSaga() {
    yield takeEvery('SAGA/FETCH_FAVORITES', fetchFavorites)
    yield takeEvery('SAGA/ADD_FAVORITES', addToFavorites)
    yield takeEvery('SAGA/UPDATE_CATEGORY', updateCategory)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
    favoriteList,
    addToFavorites,
    updateCategory,
    }),
    applyMiddleware(logger, sagaMiddleware)
  );

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
