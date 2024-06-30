const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Channel extends Model {}

Channel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Channel',
    tableName: 'channels',
    timestamps: true
});

module.exports = Channel;
