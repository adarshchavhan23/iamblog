const env = require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const { error } = require('./middlewares/error');
const { connectDb } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const FRONTEND_URL = process.env.FRONTEND_URL;

connectDb();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true, origin: FRONTEND_URL, methods:['GET', 'POST', 'PUT', 'DELETE']
}));

// available routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

// error hanlder
app.use(error);

app.listen(port, ()=> {
    console.log('🚀app running..')
})