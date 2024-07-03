// models/Message.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const Channel = require('./channel');
const User = require('./user');

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    channelId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Channel,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true
});

// Define associations
Message.belongsTo(Channel, { foreignKey: 'channelId' });
Message.belongsTo(User, { foreignKey: 'userId' });
Channel.hasMany(Message, { foreignKey: 'channelId' });
User.hasMany(Message, { foreignKey: 'userId' });

module.exports = Message;
