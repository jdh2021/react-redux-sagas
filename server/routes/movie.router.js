const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET all movies
router.get('/', (req, res) => {
  console.log('in GET all movies');
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

// GET movies by id
router.get('/details/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  console.log('in GET movie/details/:movieId. Movie id is:', movieId);
  const queryText = `SELECT * FROM "movies" WHERE "id" =$1;`;
  pool.query(queryText, [movieId]).then(result => {
    console.log('GET movie by id success');
    res.send(result.rows[0]);
  }).catch(error => {
    console.log('Error in GET movie by id');
    res.sendStatus(500);
  })
});

// POST added movie
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        console.log('POST success');
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;