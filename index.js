const express = require('express')
const helmet = require('helmet');

const userRoute = require('./api/users-route.js');
const loginRoute = require('./api/login-route.js');
const registerRoute = require('./api/register-route.js');

const server = express()

server.use(helmet());
server.use(express.json())
 
// routing
server.use('/api/users', userRoute);
server.use('/api/login', loginRoute);
server.use('/api/register', registerRoute);


server.get('/', (req, res) => {
    res.send("Server is running");
  });

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);