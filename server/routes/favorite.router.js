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
  ("name")
  VALUES
  ($1)
  `;
  const queryValues=[
    newFavorite.name
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
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
