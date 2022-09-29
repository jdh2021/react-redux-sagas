import { useHistory } from 'react-router-dom';
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
    // use selector to get movie clicked on from singleMovieGenres reducer
    const singleMovieGenres = useSelector(store => store.singleMovieGenres);

    const goToMovieList = () => {
        history.push('/');
    }

    return <Grid container justifyContent="center">
        <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
        </Grid>
        <Grid item xs={10} sm={10} md={6} lg={4} xl={4}>
            <Card key={singleMovie.id} elevation={4}>
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
                    <Typography variant="body2">
                        {singleMovie.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2">
                        Genre(s):
                        {singleMovieGenres.map(genre =>
                            <span key={genre.name}> {genre.name}</span>
                        )}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Button variant="contained" onClick={goToMovieList}>Back To List</Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
        </Grid>
    </Grid>
}

export default SingleMovieDetail;