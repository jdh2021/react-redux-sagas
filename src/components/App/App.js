import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import SingleMovieDetail from '../SingleMovieDetail/SingleMovieDetail';
import Header from '../Header/Header';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import EditMovieForm from '../EditMovieForm/EditMovieForm';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const fontTheme = createTheme({
  typography: {
    fontFamily: ['Kanit', 'sans serif'].join(',')
  },
  palette: {
    text: {
      primary: '#000066',
    },
  }
});

function App() {
  return (<ThemeProvider theme={fontTheme}>
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path="/details/:movieId" exact>
          <SingleMovieDetail />
        </Route>
        {/* Add Movie page */}
        <Route path="/movieadd" exact>
          <AddMovieForm />
        </Route>
        {/* Edit Movie page */}
        <Route path="/movieedit/:movieId" exact>
          <EditMovieForm />
        </Route>
      </Router>
    </div>
  </ThemeProvider>
  );
}

export default App;
