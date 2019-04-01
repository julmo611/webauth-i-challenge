const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

const Users = require('../users/users-model.js');


router.post('/api/register', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


  module.exports = router