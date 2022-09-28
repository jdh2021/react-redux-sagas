import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const SingleMovieDetail = () => {
    // use history to navigate between pages
    const history = useHistory();
    // use dispatch to report action to store
    const dispatch = useDispatch();

    const goToMovieList = () => {
        history.push('/');
    }

    return (
        <button onClick={goToMovieList}>Back to List</button>
    )

}

export default SingleMovieDetail;