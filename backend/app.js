const express = require('express');
const User = require('./models/user.js');

const app = express();
const port = 3000;

app.use(express.json());


app.post('/users', async (req,res) => {
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

app.delete('/users', async (req,res) => {
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

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({where: {username}});
        if (!user){
            return res.status(404).send('User not found');
        }
        if (! await user.checkPassword(password)){
            return res.status(401).send('Invalid password');
        } else {
            res.status(200).send('Logged in succesfuly');
        }
    } catch(error){
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
