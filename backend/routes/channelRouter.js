const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const jwt = require('jsonwebtoken');


const secretKey = 'secretkey';


router.post('/channels', async(req,res) => {
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