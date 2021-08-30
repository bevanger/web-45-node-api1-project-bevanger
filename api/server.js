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
    const newUser =req.body
    if (!newUser.name || !newUser.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"})
    } else {
        User.insert(newUser)
        .then(createdUser => {
            res.status(201).json(createdUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the user to the database" })  
        })
    }   
});
//[GET] returns array of users
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
});
//[GET] returns user object with id 
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            }else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
});
//[DELETE] removes user with id
server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            }else {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "The user could not be removed" })
        })
});
//[PUT] updates user
server.put('/api/users/:id', async (req, res) => { 
    try {
        const oldUser = await User.findById(req.params.id)
        if(!oldUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            if (!req.body.name || !req.body.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                const updatedUser = await User.update(req.params.id, req.body)
                    res.status(200).json(updatedUser)
            }
        } 

        } catch (err) {
            res.status(500).json({ message: "The user information could not be modified" })
        }
    });


module.exports = server; // EXPORT YOUR SERVER instead of {}
