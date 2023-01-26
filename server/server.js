const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const giphy_api_key = process.env.GIPHY_API_KEY;
// App PORT set with production check
const PORT = process.env.PORT || 5000;
require('dotenv').config()

// Route includes
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

app.get('/gifs', (req, res) => {
  // Here is where we will ask the Giphy API
  // for data:
  axios({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/trending?api_key=${giphy_api_key}`
  }).then((response) => {
    res.send(response.data);
  }).catch((error) => {
    console.log('GET /gifs fail:', error);
    res.sendStatus(500);
  })
})

// Routes
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
