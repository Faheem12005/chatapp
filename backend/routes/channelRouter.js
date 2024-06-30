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

    
router.delete('/channels',async(req,res) => {
    try{
        const { id } = req.query;
        const channel = await Channel.findByPk(id);
        if (channel){
            await channel.destroy();
            res.status(204).send();
            console.log('Channel deleted successfully');
        } else{
            res.status(404).send('Channel not found');
        }
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

});


module.exports = router;