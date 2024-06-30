const express = require('express');
const userRouter = require('./routes/userRouter')
const channelRouter = require('./routes/channelRouter')
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api',userRouter);
app.use('/api', channelRouter);




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
