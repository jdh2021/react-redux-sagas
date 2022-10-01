const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET ALL genres
router.get('/', (req, res) => {
  // Add query to get all genres
  console.log('in GET all genres');
  const queryText = 'SELECT * FROM "genres" ORDER BY "id" ASC';
  pool.query(queryText).then( result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error in GET all genres.');
      res.sendStatus(500)
    })
});

// GET genres by movie id
router.get('/details/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  console.log('in GET genre/details/:movieId. Movie id is:', movieId);
  // movies_genres is junction table linking genre_id and move_id
  // join genres and movies_genres to get genre names for movie by movie id
  const queryText = `SELECT "genres"."name" FROM "genres"
                    JOIN "movies_genres" ON "genres"."id"="movies_genres"."genre_id"
                    WHERE "movie_id" = $1;`;
  pool.query(queryText, [movieId]).then(result => {
      console.log('GET genre(s) by movie id success');
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error in GET genres by id:', error);
      res.sendStatus(500)
    })
});

module.exports = router;