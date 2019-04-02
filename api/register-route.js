const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const db = require('../users/users-model.js');

router.post('/', (req, res) => {
    let user = req.body;
  
    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;
  
    db.add(user)
      .then(saved => {
       
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });


  module.exports = router