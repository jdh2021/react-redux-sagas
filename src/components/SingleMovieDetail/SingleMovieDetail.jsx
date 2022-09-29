import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const SingleMovieDetail = () => {
    // use history to navigate between pages
    const history = useHistory();
    // use dispatch to report action to store
    const dispatch = useDispatch();
    // use selector to get movie clicked on from singleMovie reducer
    const singleMovie = useSelector(store => store.singleMovie);
    // use selector to get movie clicked on from singleMovieGenres reducer
    const singleMovieGenres = useSelector(store => store.singleMovieGenres);

    const goToMovieList = () => {
        history.push('/');
    }

    return <div key={singleMovie.id}>
        {singleMovie.title}<br />
        <img src={singleMovie.poster}/><br />
        {singleMovie.description}<br />
        <span>Genre(s): 
            {singleMovieGenres.map(genre => 
                <span key={genre.name}> {genre.name}</span>
            )}
        </span><br />
        <button onClick={goToMovieList}>Back to List</button>
    </div>
}

export default SingleMovieDetail;