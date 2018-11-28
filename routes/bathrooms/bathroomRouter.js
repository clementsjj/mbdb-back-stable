// AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA

var express = require('express');
var router = express.Router();
var bathroomController = require('./controller/bathroomController');
var axios = require('axios');

router.get('/placesautocomplete', (req, res) => {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA',
    Promise: Promise
  });

  googleMapsClient
    .placesQueryAutoComplete({
      input: 'whole foods houston new york',
      //language: 'en',
      location: [40.7235, -73.9907]
      //radius: 500
      //keyword: 'whole foods'
      //type: '',
      //rankby: 'distance',
    })
    .asPromise()
    .then(response => {
      console.log('AUTORESULTS: ', response.json);
      res.json(response.json);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/placesearch', (req, res) => {
  console.log('*************************************');
  console.log('Sending Google Places Request... with: ', req.query.query);
  console.log('*************************************');

  let query = req.query.query;
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA',
    Promise: Promise
  });

  googleMapsClient
    .places({
      query: query,
      language: 'en',
      location: [40.7235, -73.9907],
      radius: 100
    })
    .asPromise()
    .then(response => {
      res.json(response.json.results);
    })
    .catch(err => {
      console.log(err);
    });

  // googleMapsClient
  //   .findPlace({
  //     input: 'whole foods',
  //     inputtype: 'textquery',
  //     fields: ['formatted_address', 'name'],
  //     locationbias: { radius: 1000, center: { lat: 40.7308, lng: -73.9973 } }
  //   })
  //   .asPromise()
  //   .then(response => {
  //     res.json(response.json.results);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

router.get('/getallbathrooms', bathroomController.findBathrooms);

router.post('/addbathroom', (req, res) => {
  console.log('Adding a Bathroom (sent from bathroomRouter)');
  bathroomController
    .addBathroom(req.body)
    .then(user => {
      res.status(200).json({
        confirmation: 'success',
        payload: user
      });
    })
    .catch(err => {
      res.status(400).json({
        confirmation: 'failure',
        payload: err
      });
    });
});

module.exports = router;
