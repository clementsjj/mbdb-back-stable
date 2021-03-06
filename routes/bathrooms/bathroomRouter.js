// AIzaSyAbFlH5i12gn57-9R-1sKrZA9z_ojn1lwA

var express = require('express');
var router = express.Router();
var bathroomController = require('./controller/bathroomController');
var axios = require('axios');
var cors = require('cors');

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
      res.json(response.json);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/placesearch', (req, res) => {
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

router.get('/getvalidatedbathrooms', bathroomController.findValidatedBathrooms);
router.get(
  '/getnonvalidatedbathrooms',
  bathroomController.findNonValidatedBathrooms
);
router.get('/getallbathrooms', cors(), bathroomController.findAllBathrooms);

router.put('/deletebathroom', (req, res) => {
  console.log('Going to delete..');
  bathroomController
    .deleteBathroom(req.body)
    .then(bathroom => {
      console.log('Bathroom Deleted: ', bathroom);
      res.status(200).json({
        confirmation: 'success',
        payload: bathroom
      });
    })
    .catch(err => {
      res.status(400).json({
        confirmation: 'failure',
        payload: err
      });
    });
});

router.put('/addadditionalcode', (req, res) => {
  //console.log(req.body);
  bathroomController
    .addAdditionalCode(req.body)
    .then(data => {
      console.log(data);
      res.status(200).json({
        confirmation: 'success',
        payload: data
      });
    })
    .catch(err => {
      res.status(400).json({
        confirmation: 'failure',
        payload: err
      });
    });
});

router.put('/removecode', (req, res) => {
  bathroomController
    .removeCode(req.body)
    .then(data => {
      res.status(200).json({
        confirmation: 'success',
        payload: data
      });
    })
    .catch(err => {
      res.status(400).json({
        confirmation: 'failure',
        payload: err
      });
    });
});

router.put('/editbathroom', (req, res) => {
  bathroomController
    .editBathroom(req.body)
    .then(bathroom => {
      res.status(200).json({
        confirmation: 'success',
        payload: bathroom
      });
    })
    .catch(err => {
      res.status(400).json({
        confirmation: 'failure',
        payload: err
      });
    });
});

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
