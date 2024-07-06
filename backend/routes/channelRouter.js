const express = require('express');
const router = express.Router();
const Channel = require('../models/channel');
const jwt = require('jsonwebtoken');
const Message = require('../models/message');
const User = require('../models/user');


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

router.get('/channels/:id', async(req,res) => {
    try{
        console.log('checking for messages');
        const id = req.params.id;
        const messages = await Message.findAll({
            where: { channelId: id},
            include: {
                model: User,
                attributes: ['username'],
            },
        });
        if (!messages){
            res.status(404).json("no messages found")
        }
        console.log(messages);
        const formattedMessages = messages.map(message => ({
            username: message.User.username,
            content: message.content,
            time: message.createdAt,
        }));
        res.status(200).json(formattedMessages);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
})


});


module.exports = router;