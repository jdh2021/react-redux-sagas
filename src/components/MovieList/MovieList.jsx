import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function MovieList() {
    // use history to navigate between pages
    const history = useHistory();
    // useDispatch to report an action to store
    const dispatch = useDispatch();
    // useSelector to retrieve data (array of movie objects) from movies reducer
    const movies = useSelector(store => store.movies);

    // useEffect to dispatch action 'FETCH_MOVIES' to store when MovieList component renders
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToSingleMovieDetail = (movieId) => {
        console.log('in goToSingleMovieDetail. movieId is', movieId);
        // GET movie clicked on by dispatching action 'FETCH_SINGLE_MOVIE' to store
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: movieId });
        history.push('/details');
    }

    return <Grid container justifyContent="center">
        {movies.map(movie => {
            return (<Grid item xs={8} sm={6} md={4} lg={3} xl={2} sx={{ m: 1 }}>
                <Card key={movie.id} elevation={4} sx={{ backgroundColor: "#d6dde3" }}>
                    <CardContent>
                        <Typography variant="body1">
                            {movie.title}
                        </Typography>
                    </CardContent>
                    <Box onClick={() => goToSingleMovieDetail(movie.id)}>
                        <CardMedia
                            sx={{
                                width: 185,
                                height: 273,
                                display: "inline",
                                mb: 4,
                            }}
                            component="img"
                            image={movie.poster}
                            alt={movie.title}
                        />
                    </Box>
                </Card>
            </Grid>)    
        })}
    </Grid>
}

export default MovieList;