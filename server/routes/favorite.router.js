const express = require('express');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = 'SELECT id,name FROM favorites';
  pool.query(queryText)
  .then((result) => {res.send(result.rows); })
  res.sendStatus(200)
  .catch((err) => {
    CommandCompleteMessage.log('Error in SELECT favorite query', err);
    res.sendStatus(500);
  });
});

// add a new favorite
router.post('/', (req, res) => {
  const newFavorite = req.body;
  const queryText = `
  INSERT INTO favorites
  ("url")
  VALUES
  ($1)
  `;
  const queryValues=[
    newFavorite.url
  ];
  pool.query(queryText,queryValues)
  .then(() => { res.sendStatus(201);})
  .catch((err) => {
    console.log('Error completing SELECT favorite query', err);
    res.sendStatus(500);
  });
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  const updatedFavorite = req.body;
  const queryText = `UPDATE favorites
  SET "name" = $1
  WHERE id=$2;`;

  const queryValues = [
    updatedFavorite.name,
  ];
  pool.query(queryText,queryValues)
  .then(() => {res.sendStatus(200);})
  .catch((err) => {
    console.log('Error completing SELECT favorite query', err);
    res.sendStatus(500);
  });
  // req.body should contain a category_id to add to this favorite image
});

// delete a favorite
router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM favorites WHERE id=$1';
  pool.query(queryText, [req.params.id])
  .then(() => { res.sendStatus(200); })
  .catch((err) => {
    console.log('Error in DELETE favorite query', err);
    res.sendStatus(500);
  });
});

module.exports = router;
