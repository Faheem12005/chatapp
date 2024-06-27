const express = require('express');
const sequelize = require('sequelize');
const User = require('./models/user.js');

const app = express();
const port = 3000;

app.use(express.json());


app.post('/users', async (req,res) => {
    try{
        const { username, password} = req.body;
        const user = await User.create({username,password});
        console.log(user.toJSON());
        res.status(201).json(user);
    } catch(error){
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
