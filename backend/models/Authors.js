const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/sequelize.config');

const Authors = sequelize.define('Authors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    year_of_birth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Authors',
    timestamps: true,
    paranoid: true,
});

module.exports = Authors;