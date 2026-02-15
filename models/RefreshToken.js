const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Users = require('./Users');
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
            model: Users,
            key: "id"
        }
    }
}, {
    tableName: 'refresh_tokens',
    timestamps: true
});

Users.hasMany(RefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
RefreshToken.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = RefreshToken;

