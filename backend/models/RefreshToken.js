const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/sequelize.config');
const RefreshToken = sequelize.define('RefreshToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    }
}, {
    tableName: 'refresh_tokens',
    timestamps: true
});



module.exports = RefreshToken;

