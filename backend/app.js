const express = require('express');
const userRouter = require('./routes/userRouter')
const channelRouter = require('./routes/channelRouter')
const cookieParser = require('cookie-parser');
const http = require('http');
const cors =require('cors');
const socketIo = require('socket.io');
const Message = require('./models/message');
const Channel = require('./models/channel');
const User = require('./models/user');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

io.on('connection', (socket) => {
    console.log('New client connected');
  
    // Join a room
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`Client joined room: ${room}`);
    });
    
  
    // Leave a room
    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      console.log(`Client left room: ${room}`);
    });

    //delete a channel
    socket.on('deleteChannel', async(id) => {
        try{
            console.log(id);
            const channel = await Channel.findByPk(id);
            if(channel){
                await Message.destroy({ where: {channelId: id}})
                await channel.destroy();
                console.log(`channel ${id} deleted succesfully`);
                io.emit('channelDeleted',id);
            } else{
                console.log(`Channel not found`);
            }
        } catch(error){
            console.log('Error occured',error);
        }
    });
  
    // Handle chat message
    socket.on('chatMessage', async ({ room, message, username }) => {
        try{
            let user = await User.findOne({where: { username }});
            if (!user){
                console.log('user not found');
            }
            console.log(room);
            let channel = await Channel.findOne({ where: { id: room}});
            if (!channel){
                console.log('channel not found');
            }

            const newMessage = await Message.create({
                content: message,
                channelId: channel.id,
                userId: user.id,
            });

            io.to(room).emit('message', {
                username: user.username,
                content: newMessage.content,
            });
            console.log('message sent succesfully');
        } catch(error){
            console.error('Error saving message:', error);
        }
     
    });
  
    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});


const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api',userRouter);
app.use('/api', channelRouter);




httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
