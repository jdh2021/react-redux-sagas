import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    // use history to navigate between pages
    const history = useHistory();
    // useDispatch to report an action to store
    const dispatch = useDispatch();
    // useSelector to retrieve data, array of movie objects, from movies reducer
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToSingleMovieDetail = (id) => {
        console.log('in goToSingleMovieDetail');
        history.push('/detail');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} 
                                alt={movie.title}
                                onClick={() => goToSingleMovieDetail(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;