const express = require('express');
const helmet = require('helmet')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionRouter = require('./actions/actions-router')
//const {} = require('./actions/actions-middlware')
// Build your projects router in /api/projects/projects-router.js
const projectRouter = require('./projects/projects-router')
//const {} = require('./projects/projects-middleware')
// Do NOT `server.listen()` inside this file!
const server = express();
server.use(express.json())
server.use(helmet())
server.use('/api/projects',projectRouter)
server.use('/api/actions',actionRouter)

server.use(errorHandling)
module.exports = server;

//eslint-disable-next-line
function errorHandling (err, req, res, next){
    res.status(err.status ||500).json({
        message: err.message,
        stack: err.stack,
    })
}