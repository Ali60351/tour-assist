//jshint esversion:6

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const user = require('./controllers/user.js');
const attraction = require('./controllers/attraction.js');
const accomodation = require('./controllers/accomodation.js');
const restaurant = require('./controllers/restaurant.js');
const travel = require('./controllers/travel.js');
const image = require('./controllers/image.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', port);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = (process.env.NODE_ENV !== 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);
  
  // Listen the server
  app.listen(port, host);
  console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
  user.initialize();
  image.initialize();
}

app.post('/test', (req, res) => {
  console.log(req.body);
  uploadImage(req.body.image).then((link) => {
    

    res.status = 200;
    res.json({});
  }).catch(err => {
    res.status = 401;
    res.json({message: 'Error uploading image', obj: err});
  });
});

app.post('/signup', user.signup);
app.post('/login', user.signin);

app.get('/fetchAttractions', attraction.getAllAttractions);
app.get('/fetchAttractions/:id', attraction.getAttraction);
app.post('/addAttraction', attraction.addAttraction);

app.get('/fetchRestaurants', restaurant.getAllRestaurants);
app.get('/fetchRestaurants/:id', restaurant.getRestaurant);
app.post('/addRestaurant', restaurant.addRestaurant);

app.get('/fetchAccomodations', accomodation.getAllAccomodations);
app.get('/fetchAccomodations/:id', accomodation.getAccomodation);
app.post('/addAccomodation', accomodation.addAccomodation);

app.get('/fetchTravels', travel.getAllTravels);
app.get('/fetchTravels/:id', travel.getTravel);
app.post('/addTravel', travel.addTravel);

start();