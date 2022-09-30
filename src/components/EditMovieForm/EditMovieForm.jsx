import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const EditMovieForm = () => {
    // use history to navigate between pages
    const history = useHistory();
    // use dispatch to report action to store
    const dispatch = useDispatch();
    // use selector to get movie clicked on from singleMovie reducer
    const singleMovie = useSelector(store => store.singleMovie);
    // use selector to get genre(s) of movie clicked on from singleMovieGenres reducer
    const singleMovieGenres = useSelector(store => store.singleMovieGenres);
    // useParams to access dynamic piece of URL, movieId, from /edit/:movieId
    const { movieId } = useParams();
 
    // useEffect to get movie to edit, all genres when EditMovieForm component renders
    useEffect(() => {
        console.log('in useEffect - edit movie');
        dispatch({ type: 'FETCH_GENRES' })
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: movieId });
    }, []);
    
    return <div> Edit Movie Form</div>
};

export default EditMovieForm;