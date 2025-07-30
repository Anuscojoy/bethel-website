const express = require('express');
const cors =require('cors');
const contactRoutes =require('./routes/contact');
//setting up the .env file
require('dotenv').config();
//initializing  the express server
const app = express();
//use the cors for requests
app.use(cors());

app.use(express.json());

//include all contact routes
//endpoint URL /app/contact
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});