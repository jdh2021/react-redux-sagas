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
        // after successful GET, dispatch action 'SET_MOVIES' to store data in movies reducer
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }       
}

function* fetchSingleMovie(action) {
    // GET movie clicked on, payload is movieId
    try {
        const singleMovie = yield axios.get(`/api/movie/details/${action.payload}`);
        const singleMovieGenres = yield axios.get(`/api/genre/details/${action.payload}`);
        console.log('get movie by id:', singleMovie.data)
        console.log('get genres by id:', singleMovieGenres.data);
        // after successful GET by id, dispatch actions to store data in singleMovie and singleMovieGenres reducers
        yield put ({ type: 'SET_SINGLE_MOVIE', payload: singleMovie.data})
        yield put ({ type: 'SET_SINGLE_MOVIE_GENRES', payload: singleMovieGenres.data})
    } catch {
        console.log('get by id error');
    }     
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store all movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store single movie object clicked on in MovieList
const singleMovie = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SINGLE_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store all movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store array of genre objects from singleMovie clicked on in MovieList
const singleMovieGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_SINGLE_MOVIE_GENRES':
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
        singleMovie,
        singleMovieGenres
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
