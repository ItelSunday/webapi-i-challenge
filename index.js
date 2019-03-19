// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());


//POST - creates a user using info sent in request body
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('user information', userInfo);

    db.insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error while saving the user to the database'});
        })
    });

//GET- /api/users- Returns an array of all the user objects contained in the database.
server.get('/knex', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'The users information could not be retrieved.'});
    })
});

//GET- /api/users/:id - Returns the user object with the specified id.
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById()
    .then(user => {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(404).json({  message: "The user with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'The users information could not be retrieved.'});
    })
});

// DELETE -	/api/users/:id - Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(deletedUser => {
        if(deletedUser) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed"});
    });
});













server.listen(5000, () => {
    console.log('\n** API up and running on port 4k **');
});