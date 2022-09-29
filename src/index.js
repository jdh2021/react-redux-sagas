import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


// Create the rootSaga generator function
function* rootSaga() {
    // watch for action 'FETCH_MOVIES', call function fetchAllMovies
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // watch for action 'FETCH_SINGLE_MOVIE', call function fetchSingleMovie
    yield takeEvery('FETCH_SINGLE_MOVIE', fetchSingleMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        // after successful GET, dispatch action 'SET_MOVIES' (movies reducer)
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }       
}

function* fetchSingleMovie(action) {
    // GET movie clicked on, payload is movieId
    try {
        const singleMovie = yield axios.get(`/api/movie/detail/${action.payload}`);
        console.log('get by id:', singleMovie.data)
        // after successful GET by id, dispatch action 'SET_SINGLE_MOVIE' (singleMovie reducer)
        yield put ({ type: 'SET_SINGLE_MOVIE', payload: singleMovie.data})
    } catch {
        console.log('get by id error');
    }     
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store single movie object clicked on from MovieList
const singleMovie = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_MOVIE':
            return action.payload;
        default:
            return state;
    }
}


// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        singleMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
