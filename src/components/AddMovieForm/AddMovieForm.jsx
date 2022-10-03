import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const AddMovieForm = () => {
    // use history to navigate between pages
    const history = useHistory();
    // use dispatch to report action to store
    const dispatch = useDispatch();
    // useSelector to retrieve data (array of genres) from genre reducer for genre dropdown
    const allGenres = useSelector(store => store.genres);
    // useSelector to set default value for input fields from store
    const inputTitle = useSelector(store => store.inputTitle);
    const inputImage = useSelector(store => store.inputImage);
    const inputDescription = useSelector(store => store.inputDescription);
    const selectedGenre = useSelector(store => store.selectedGenre);

    const dispatchTitle = (event) => {
        dispatch({ type: 'DISPATCH_TITLE', payload: event.target.value });
    }
    const dispatchImage = (event) => {
        dispatch({ type: 'DISPATCH_IMAGE', payload: event.target.value });
    }
    const dispatchDescription = (event) => {
        dispatch({ type: 'DISPATCH_DESCRIPTION', payload: event.target.value });
    }
    const dispatchGenre = (event) => {
        dispatch({ type: 'DISPATCH_GENRE', payload: event.target.value });
    }

    // useEffect to get all genres when AddMovieForm component renders
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' })
    }, []);

    // passed as part of payload to postMovie, routes to MovieList upon successful POST
    const goToMovieList = () => {
        dispatch({ type: 'CLEAR_INPUT' });
        history.push('/');
    }

    // dispatches 'POST_MOVIE' if inputs aren't empty, payload is movie object
    const postMovie = () => {
        console.log('in postMovie');
        if (inputTitle === '' || inputImage === '' || inputDescription === '' || selectedGenre === '') {
            alert('Please complete all fields to add a movie.');
            return;
        } else {
            dispatch({
                type: 'POST_MOVIE',
                payload: {
                    title: inputTitle,
                    poster: inputImage,
                    description: inputDescription,
                    genre_id: selectedGenre
                },
                goToMovieList: goToMovieList
            });
        }
    }

    return <div>
        <Grid container justifyContent="center">
            <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
            </Grid>
            <Grid item xs={10} sm={10} md={6} lg={4} xl={4}>
                <Card elevation={4} sx={{ backgroundColor: "#d6dde3" }}>
                    <Button variant="contained"
                        className="Button"
                        disabled
                        size="large"
                        sx={{ mt: 3, mb: 1.5 }}>
                        <VideoCallIcon />
                    </Button>
                    <Typography variant="h6">
                        Add A Movie
                    </Typography>
                    <CardContent>
                        <TextField
                            label="Movie Title"
                            size="small"
                            margin="normal"
                            fullWidth
                            required
                            variant="outlined"
                            value={inputTitle}
                            onChange={dispatchTitle}
                        />
                        <TextField
                            label="Image URL for Poster"
                            size="small"
                            margin="normal"
                            fullWidth
                            required
                            variant="outlined"
                            value={inputImage}
                            onChange={dispatchImage}
                        />
                        <TextField
                            label="Movie Description"
                            multiline
                            margin="normal"
                            fullWidth
                            required
                            rows={6}
                            value={inputDescription}
                            onChange={dispatchDescription}
                        />
                        <TextField
                            label="Movie Genre"
                            select
                            size="small"
                            margin="normal"
                            fullWidth
                            required
                            value={selectedGenre}
                            onChange={dispatchGenre}
                        >
                            {allGenres.map(genre =>
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            )}
                        </TextField>
                    </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Button variant="contained" onClick={() => history.push('/')} sx={{ mb: 2, ml: 2 }}>Back</Button>
                        <Button variant="contained" onClick={() => dispatch({ type: 'CLEAR_INPUT' })} sx={{ mb: 2, ml: 2 }}>Clear</Button>
                        <Button variant="contained" sx={{ mb: 2, mr: 2 }} onClick={postMovie}>Save</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
            </Grid>
        </Grid>
    </div>
};

export default AddMovieForm;