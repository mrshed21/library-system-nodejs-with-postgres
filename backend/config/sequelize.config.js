const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const DB_NAME = process.env.DB_NAME || 'library_v7';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('✅ Database synchronized successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
