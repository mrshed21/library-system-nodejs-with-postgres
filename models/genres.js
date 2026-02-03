const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

//TODO implement the Genres model
const Genres = sequelize.define('Genres', {
 id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
 },
 name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
 },
 createdAt : {
    type: DataTypes.DATE,
    allowNull: false,
 },
 updatedAt : {
    type: DataTypes.DATE,
    allowNull: false,
 },
},
{
    tableName: 'Genres'
   
}
)

module.exports = Genres;
