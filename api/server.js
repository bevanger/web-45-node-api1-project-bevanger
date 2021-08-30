// BUILD YOUR SERVER HERE
//Imports
const express = require('express');
//instance of express app
const server = express();
//global middleware
server.use(express.json());

//[POST] creates new user
server.post('/api/users', (req, res) => {
    res.json('creates new user')
});
//[GET] returns array of users
server.get('/api/users', (req, res) => {
    res.json('returns array of users')
});
//[GET] returns user object with id 
server.get('/api/users/:id', (req, res) => {
    res.json('returns user object with id')
});
//[DELETE] removes user with id
server.delete('/api/users/:id', (req, res) => {
    res.json('deletes user')
});
//[PUT] updates user
server.put('/api/users/:id', (req, res) => {
    res.json('updates user')
});




module.exports = server; // EXPORT YOUR SERVER instead of {}
