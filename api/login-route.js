const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile.js')
const Users = require('../users/users-model.js');

const db = knex(knexConfig.development)


router.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        // check tha password guess against the database
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


  module.exports = router