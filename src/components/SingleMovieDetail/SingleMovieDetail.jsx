import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
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

    // useEffect to dispatch action 'FETCH_SINGLE_MOVIE' when SingleMovieDetail component renders
    useEffect(() => {
        console.log('in useEffect - singleMovieDetail')
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: movieId });
    }, []);

    const goToMovieList = () => {
        history.push('/');
    }

    const editMovie = (movieId) => {
        console.log('in editMovie. movieId is', movieId);
        history.push(`/edit/${movieId}`);
    }

    return <Grid container justifyContent="center">
        <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
        </Grid>
        <Grid item xs={10} sm={10} md={6} lg={4} xl={4}>
            <Card key={singleMovie.id} elevation={4} sx={{ backgroundColor: "#d6dde3"}}>
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
                    <Typography style={{ wordWrap: "break-word" }}  variant="body2">
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
                    <Button variant="contained" onClick={goToMovieList} sx={{ mb: 2, ml: 2 }}>Back To List</Button>
                    <Button variant="contained" sx={{ mb: 2, mr: 2 }} onClick={() => editMovie(singleMovie.id)}>Edit</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
        </Grid>
    </Grid>
}

export default SingleMovieDetail;