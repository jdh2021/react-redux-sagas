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
    // watch for action, call generator function
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_SINGLE_MOVIE', fetchSingleMovie);
    yield takeEvery('POST_MOVIE', postMovie);
    yield takeEvery('PUT_MOVIE', putMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all movies:', movies.data);
        // after successful GET, dispatch action 'SET_MOVIES' to store data in movies reducer
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
        alert('There\'s an error in fetch all movies.');
    }       
}

function* fetchAllGenres() {
    // get all genres from the DB
    try {
        const genre = yield axios.get('/api/genre');
        console.log('get all genres:', genre.data);
        // after successful GET, dispatch action 'SET_GENRES' to store data in genres reducer
        yield put({ type: 'SET_GENRES', payload: genre.data });
    } catch {
        console.log('get all error');
        alert('There\'s an error in fetch all genres.');
    }       
}

function* fetchSingleMovie(action) {
    // GET - movie clicked on, payload is movieId
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
        alert('There\'s an error in fetch single movie.');
    }     
}

function* postMovie(action) {
    // POST - movie added, payload is movie object
    try {
        yield axios.post('/api/movie', action.payload);
        console.log('movie to post:', action.payload)
        // if POST successful, clear inputs and go to MovieList component where 'FETCH_MOVIES' is dispatched on render
        action.goToMovieList();
    } catch (error) {
        console.log('Error posting element', error);
        alert('There\'s an error in post added movie.');
    }
}

function* putMovie(action) {
    // PUT - movie edited, payload is movie object
    try {
        console.log('movie to edit:', action.payload);
        yield axios.put('/api/movie/edit', action.payload);
        // if PUT successful, go to MovieDetail component where 'FETCH_SINGLE_MOVIE' is dispatched on render
        action.goToMovieDetail();
    } catch (error) {
        console.log('Error posting element', error);
        alert('There\'s an error in update added movie.');
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

// Used to store input title from AddMovieForm
const inputTitle = (state = '', action) => {
    switch (action.type) {
        case 'DISPATCH_TITLE':
            return action.payload;
        case 'CLEAR_INPUT':
            return '';
        default:
            return state;
    }
}

// Used to store input image from AddMovieForm
const inputImage = (state = '', action) => {
    switch (action.type) {
        case 'DISPATCH_IMAGE':
            return action.payload;
        case 'CLEAR_INPUT':
                return '';
        default:
            return state;
    }
}

// Used to store input description from AddMovieForm
const inputDescription = (state = '', action) => {
    switch (action.type) {
        case 'DISPATCH_DESCRIPTION':
            return action.payload;
        case 'CLEAR_INPUT':
                return '';
        default:
            return state;
    }
}

// Used to store selected genre from AddMovieForm
const selectedGenre = (state = '', action) => {
    switch (action.type) {
        case 'DISPATCH_GENRE':
            return action.payload;
        case 'CLEAR_INPUT':
                return '';
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
        singleMovieGenres,
        inputTitle,
        inputImage,
        inputDescription,
        selectedGenre
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
