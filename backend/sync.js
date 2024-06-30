const sequelize = require('./database.js');
const User = require('./models/user.js');
const Channel = require('./models/channel.js')

const syncDb = async() => {
    try{
        await sequelize.sync({alter: true});
        console.log('database and tables created');
    } catch(error){
        console.error('Error syncing database:', error);
    }
}

syncDb();
