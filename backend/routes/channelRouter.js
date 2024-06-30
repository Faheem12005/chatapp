const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const jwt = require('jsonwebtoken');


const secretKey = 'secretkey';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized if token is not provided
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        console.log(user);
        req.user = user; // Attach user information to request object for further handling
        next(); // Move to next middleware or route handler
    });
};

router.post('/channels',authenticateToken, async(req,res) => {
    try{
        const { name, description } = req.body;
        const channel = await Channel.create({name,description});
        res.status(201).json(channel);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.get('/channels', async(req,res) => {
    try{
        const channels = await Channel.findAll();
        console.log('channels found succesfully');
        res.status(200).json(channels);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;