const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const { connectDB } = require('./config/sequelize.config');
const helmet = require('helmet');
const apiRoutes = require('./routes/Index');


const PORT = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(helmet());



app.use('/api', apiRoutes);

connectDB();

app.listen(PORT, () => {
   console.log(`🚀 Server is running on port ${PORT}`);
});