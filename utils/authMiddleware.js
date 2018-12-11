const User = require('../routes/users/model/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  checkSignUp: (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email })
      .then(user => {
        if (!user) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) {
                const errors = {};
                errors.status = 400;
                errors.message = err;

                res.json(errors);
              } else {
                req.body.password = hash;

                User.create(req.body).then(user => {
                  const payload = {
                    username: user.username,
                    id: user._id,
                    email: user.email
                  };

                  jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      if (err) {
                        const errors = {};
                        errors.status = 400;
                        errors.message = err;

                        res.json(errors);
                      } else {
                        let success = {};
                        success.confirmation = true;
                        success.token = `Bearer ${token}`;
                        res.json(success);
                      }
                    }
                  );
                });
              }
            });
          });
        } else {
          next();
        }
      })
      .catch(err => {
        const errors = {};
        errors.status = 400;
        errors.message = err;

        res.json(errors);
      });
  },
  checkSignIn: (req, res, next) => {
    const email = req.body.email;
    User.findOne({ email })
      .then(user => {
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              username: user.username,
              id: user._id,
              email: user.email
            };

            jwt.sign(
              payload,
              process.env.SECRET_KEY,
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) {
                  const errors = {};
                  errors.status = 400;
                  errors.message = err;

                  res.json(errors);
                } else {
                  let success = {};
                  success.confirmation = true;
                  success.token = `Bearer ${token}`;
                  res.json(success);
                }
              }
            );
          } else {
            let errors = {};
            errors.password = 'Password incorrect';
            errors.status = 400;
            res.json(errors);
          }
        });
      })
      .catch(err => {
        const errors = {};
        errors.status = 400;
        errors.message = err;

        res.json(errors);
      });
  },
  successUser: (req, res) => {
    if (!req.user) {
      const errors = {};
      errors.status = 400;
      res.json(errors);
    } else {
      res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      });
    }
  }
};
