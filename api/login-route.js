const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const db = require('../users/users-model.js');

router.post('/', (req, res) => {
  let { username, password } = req.body;
 
  db.findBy({ username })
      .first()
      .then(users => {
        // check tha password guess against the database
        if (users && bcrypt.compareSync(password, users.password)) {
          res.status(200).json({ message: `Welcome ${users.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


  module.exports = router