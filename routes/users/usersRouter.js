var express = require('express');
var router = express.Router();
var usersController = require('./controller/usersController');
var axios = require('axios');
var authMiddleware = require('../../utils/authMiddleware');
const validateRegisterInput = require('../../utils/validation/register');
const validateLoginInput = require('../../utils/validation/login');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Not Found' });
});

router.post('/register', function(req, res, next) {
  console.log('Registering User: ', req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log(errors);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
    //return res.status(400).json(errors);
  }
  usersController
    .register(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

router.post('/login', function(req, res) {
  console.log('....Route login... Recieved:', req.body);
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log('....Is Valid...');
  usersController
    .login(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// router.get(
//   '/current',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user._id,
//       name: req.user.username,
//       email: req.user.email
//     });
//   }
// );
// router.get('/getallusers', userController.findUsers);
// router.get('/getuser', function(req, res, next) {
//   userController
//     .findUserDB(req.query)
//     .then(user => {
//       res.json({
//         confirmation: 'success',
//         payload: user
//       });
//     })
//     .catch(err => {
//       res.json({
//         confirmation: 'failure',
//         payload: err
//       });
//     });
// });

// router.put('/updateUser', function(req, res, next) {
//   userController
//     .updateUser(req.body)
//     .then(user => {
//       res.json({
//         confirmation: 'success',
//         payload: user
//       });
//     })
//     .catch(err => {
//       res.json({
//         confirmation: 'failure',
//         payload: err
//       });
//     });
// });

module.exports = router;
