const express = require('express');
const routes = require('./routes/index.routes');
const connectDB = require('./database/connect');
const cors = require('cors');
const {protect} = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();//create express app
app.use(express.json());//allow json data
const port = process.env.PORT || 3500;

app.use(cors({origin: true, credentials: true}));//allow cors
app.use(express.urlencoded({extended: true}));//allow url encoded data


// app.use('/api',protect,routes);//use routes
app.use('/api',routes)
connectDB();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});//listen to port

