const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config()
const app = express();
// This fishes the GIPHY_API_KEY's value out of our
// .env file:
const giphy_api_key = process.env.GIPHY_API_KEY;
const search = 'one piece';
const limit = '25';
// App PORT set with production check
const PORT = process.env.PORT || 5000;


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
    url: `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${giphy_api_key}&limit=${limit}`
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
