const express = require('express')
const helmet = require('helmet');
const session = require('express-session');

// const registerRoute = require('./api/register-route.js');

const userRoute = require('./api/users-route') 
const authRouter = require('./auth/auth-router.js');
const sessionConfig = require('./auth/session-config.js');

const server = express()

server.use(helmet());
server.use(express.json())
server.use(session(sessionConfig));
 
// routing
server.use('/api/auth', authRouter);
server.use('/api/users', userRoute);
// server.use('/api/register', registerRoute);


server.get('/', (req, res) => {
    res.send("Server is running");
  });

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);