import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import VideoCallIcon from '@mui/icons-material/VideoCall';

function MovieList() {
    // use history to navigate between pages
    const history = useHistory();
    // use dispatch to report an action to store
    const dispatch = useDispatch();
    // use selector to retrieve data (array of movie objects) from movies reducer
    const movies = useSelector(store => store.movies);

    // useEffect to dispatch action 'FETCH_MOVIES' to store when MovieList renders
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToSingleMovieDetail = (movieId) => {
        console.log('in goToSingleMovieDetail. movieId to view is', movieId);
        // update route with dynamic piece of URL, movieId
        history.push(`/details/${movieId}`);
    }

    return <div>
        <Button variant="contained" size="small" sx={{ mb: 1.5 }} onClick={() => history.push('/movieadd')}>
            <VideoCallIcon />
        </Button>
        <Grid container justifyContent="center" sx={{mb: 3}}>
            { movies.map(movie => {
                return (<Grid item xs={6} sm={4} md={3} lg={3} xl={2} sx={{ m: 1 }} key={movie.id}>
                    <Card elevation={4} sx={{ backgroundColor: "#d6dde3" }} style={{ minHeight: 370 }}>
                        <CardContent>
                            <Typography>
                                {movie.title}
                            </Typography>
                        </CardContent>
                        <CardActionArea onClick={() => goToSingleMovieDetail(movie.id)}>
                            <CardMedia
                                sx={{
                                    width: 185,
                                    height: 273,
                                    display: "inline",
                                }}
                                component="img"
                                image={movie.poster}
                                alt={movie.title}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>)
            })}
        </Grid>
    </div>
}

export default MovieList;