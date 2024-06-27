const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatapp', 'faheem', 'Strv103b_!', {
    host: 'localhost',
    dialect: 'postgres'
  });


module.exports = sequelize; 

// const trybruh = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// trybruh();