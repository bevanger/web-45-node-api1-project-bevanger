// BUILD YOUR SERVER HERE
//Imports
const express = require('express');
const User = require('./users/model.js');
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
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json( { message: err.message })
        })
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
