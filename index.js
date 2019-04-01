const express = require('express')
const router = express.Router()
const helmet = require('helmet');
const bcrypt = require('bcryptjs');

const Users = require('./users/users-model.js');

const server = express()

server.use(express.json())


server.get('/', (req, res) => {
    res.send('Server Running!!')
})

server.post('/api/register', (req, res) => {
    let user = req.body;
  
    // hash the password
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

server.get('/api/users', restricted,(req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });



function restricted(req, res, next) {
    const { username, password } = req.headers;
  
    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'Username or Password incorrect' });
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(401).json({ message: 'Please provide credentials' });
    }
  }

  server.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
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





const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
