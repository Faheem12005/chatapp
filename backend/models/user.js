const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const ROLES = require('../roles.js')

class User extends Model {
  async setPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
  }
  
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ROLES.USER
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});

module.exports = User;
