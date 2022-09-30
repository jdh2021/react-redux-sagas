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

// GET movie by id
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

// PUT movie
router.put('/movieedit', (req, res) => {
  console.log('Movie to edit is:', req.body);
  const queryText = `UPDATE "movies" SET "title" = $1, 
                    "poster" = $2, "description" = $3
                    WHERE "id" = $4;`;
  pool.query(queryText, [req.body.title, req.body.poster, req.body.description, req.body.id]).then(result => {
    console.log('PUT movie success');
    res.send(result.rows[0]);
  }).catch(error => {
    console.log('Error in PUT movie');
    res.sendStatus(500);
  })
});

// DELETE movie by id
router.delete('/details/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  console.log('in DELETE movie/details/:movieId. Movie id is:', movieId);
  // first query deletes from junction table movies_genres
  const junctionQueryText = `DELETE FROM "movies_genres" WHERE "movie_id" = $1;`;
  pool.query(junctionQueryText, [movieId]).then(result => {
    console.log('DELETE from movies_genres success');
    // second query deletes from movies
    const moviesQueryText = `DELETE FROM "movies" where "id" = $1;`;
    pool.query(moviesQueryText, [movieId]).then(result => {
      console.log('DELETE from movies success');
      res.sendStatus(200);
    }).catch(error => {
      console.log('Error in DELETE from movies');
      res.sendStatus(500);
    })
  }).catch(error => {
      console.log('Error in DELETE from movies_genres');
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