import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import SingleMovieDetail from '../SingleMovieDetail/SingleMovieDetail';
import Header from '../Header/Header';
import AddMovieForm from '../AddMovieForm/AddMovieForm';

function App() {
  return (
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
        <Route path="/details/movieadd" exact>
          <AddMovieForm />
        </Route>
      </Router>
    </div>
  );
}

export default App;
