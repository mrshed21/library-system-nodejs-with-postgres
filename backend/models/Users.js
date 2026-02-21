const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/sequelize.config');

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false , 
        required: true , 
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }, 
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
    {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Users;