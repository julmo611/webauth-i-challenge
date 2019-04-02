const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../users/users-model.js');

router.get('/', restricted,(req, res) => {
    
    db.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });


function restricted(req, res, next) {
    const { username, password } = req.headers;
  
    if (username && password) {
      db.findBy({ username })
        .first()
        .then(user => {
          // check tha password guess against the database
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'You shall not pass!!' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(401).json({ message: 'Please provide credentials' });
    }
  }


  module.exports = router