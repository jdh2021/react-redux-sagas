import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SingleMovieDetail = () => {
    // use history to navigate between pages
    const history = useHistory();
    // use dispatch to report action to store
    const dispatch = useDispatch();
    // use selector to get movie clicked on from singleMovie reducer
    const singleMovie = useSelector(store => store.singleMovie);
    // use selector to get genre(s) of movie clicked on from singleMovieGenres reducer
    const singleMovieGenres = useSelector(store => store.singleMovieGenres);
    // useParams to access dynamic piece of URL, movieId, from /details/:movieId
    const { movieId } = useParams();

    // useEffect to dispatch action 'FETCH_SINGLE_MOVIE' when SingleMovieDetail renders
    useEffect(() => {
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: movieId });
    }, []);

    const goToEditMovie = () => {
        console.log('in goToEditMovie. movieId to edit is', movieId);
        // update route with dynamic piece of URL, movieId
        history.push(`/movieedit/${movieId}`);
    }

    const confirmDelete = () => {
        console.log('in confirmDelete');
        if (window.confirm('Do you want to delete this movie?')) {
            deleteFeedback();
        }
    }

    // passed as part of payload to deleteFeedback, routes to MovieList upon successful delete
    const goToMovieList = () => {
        history.push('/');
    }

    // dispatches action to store with payload of movieId and function goToMovieList
    const deleteFeedback = () => {
        console.log('in deleteFeedback. movieId is:', movieId);
        dispatch({ type: 'DELETE_SINGLE_MOVIE', payload: movieId, goToMovieList: goToMovieList });
    };

    return <Grid container justifyContent="center">
        <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
        </Grid>
        <Grid item xs={10} sm={10} md={6} lg={4} xl={4}>
            <Card key={singleMovie.id} elevation={4} sx={{ backgroundColor: "#d6dde3", mb: 3 }}>
                <CardHeader
                    title={singleMovie.title}
                />
                <CardMedia
                    sx={{
                        width: 185,
                        height: 273,
                        display: "inline",
                    }}
                    component="img"
                    image={singleMovie.poster}
                />
                <CardContent>
                    <Typography style={{ wordWrap: "break-word" }} variant="body2">
                        {singleMovie.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2">
                        Genre(s):
                        {singleMovieGenres.map(genre =>
                            <span key={genre.name}> &#8226; {genre.name} </span>
                        )}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Button variant="contained" onClick={goToMovieList} sx={{ mb: 2, ml: 2 }}>Back</Button>
                    <Button variant="contained" onClick={confirmDelete} sx={{ mb: 2, ml: 2 }}>Delete</Button>
                    <Button variant="contained" sx={{ mb: 2, mr: 2 }} onClick={goToEditMovie}>Edit</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
        </Grid>
    </Grid>
}

export default SingleMovieDetail;