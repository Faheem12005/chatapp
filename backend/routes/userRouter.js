const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secretKey = 'secretkey';

router.post('/auth', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ isAuthenticated: false, message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ isAuthenticated: false, message: 'Invalid token' });
        }
        res.status(200).json({ isAuthenticated: true });
    });
});


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




router.post('/users', async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.build({username});
        await user.setPassword(password);
        await user.save();
        console.log(user.toJSON());
        res.status(201).json(user);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users', authenticateToken, async (req,res) => {
    try{
        const { id } = req.query;
        const user = await User.findByPk(id);
        if (user){
            await user.destroy();
            res.status(204).send();
            console.log('user deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({where: {username}});
        if (!user){
            return res.status(404).send('User not found');
        }
        if (! await user.checkPassword(password)){
            return res.status(401).send('Invalid password');
        } else {
            jwt.sign({username} , secretKey , { expiresIn: '1h' }, (err,token) => {
                if(err) { console.log(err) } 
                
                res.cookie('token',token, {httpOnly: true, secure: false, maxAge: 3600000, sameSite:'strict'})
                res.status(200).send('Cookie set succesfuly');
            });
        }
    } catch(error){
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;