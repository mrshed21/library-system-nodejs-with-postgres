const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./config/sequelize.config');
const helmet = require('helmet');
const apiRoutes = require('./routes/Index');


const PORT = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());
app.use(helmet());



app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Library System API' , healthy : "ok" });
});
app.use('/api', apiRoutes);


connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
   });
});