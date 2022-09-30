import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
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
    // useParams to access dynamic piece of URL, movieId, from /edit/:movieId
    const { movieId } = useParams();

    // useState to set initial value of input fields to values from store
    const [editTitle, setEditTitle] = useState(singleMovie.title);
    const [editImage, setEditImage] = useState(singleMovie.poster);
    const [editDescription, setEditDescription] = useState(singleMovie.description);

    // useEffect to fetch movie to edit
    useEffect(() => {
        console.log('in useEffect - edit movie');
        dispatch({ type: 'FETCH_SINGLE_MOVIE', payload: movieId });
    }, []);

    const editMovie = () => {
        console.log('in editMovie');
        if ( editTitle === '' || editImage === '' || editDescription === '') {
            alert('Please enter information for all fields.');
            return;
        } else { dispatch({  type: 'PUT_MOVIE', 
                    payload: {
                        id: singleMovie.id,
                        title: editTitle,
                        poster: editImage,
                        description: editDescription,
                    }, 
                    goToMovieDetail: goToMovieDetail});
        }
    }

    const goToMovieDetail = () => {
        history.push(`/details/${movieId}`);
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
                        Edit Movie: <span>{singleMovie.title}</span>
                    </Typography>
                        <CardContent>
                            <TextField
                                size="small"
                                margin="normal"
                                fullWidth
                                required
                                variant="outlined"
                                value={editTitle}
                                onChange={(event) => setEditTitle(event.target.value)}
                            />
                            <TextField
                                size="small"
                                margin="normal"
                                fullWidth
                                required
                                variant="outlined"
                                value={editImage}
                                onChange={(event) => setEditImage(event.target.value)}
                            />
                            <TextField
                                multiline
                                margin="normal"
                                fullWidth
                                required
                                rows={6}
                                value={editDescription}
                                onChange={(event) => setEditDescription(event.target.value)}
                            />
                        </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Button variant="contained" onClick={goToMovieDetail} sx={{ mb: 2, ml: 2 }}>Cancel</Button>
                        <Button variant="contained" sx={{ mb: 2, mr: 2 }} onClick={editMovie}>Save</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={1} sm={1} md={3} lg={4} xl={4}>
            </Grid>
        </Grid>
    </div>
};

export default EditMovieForm;