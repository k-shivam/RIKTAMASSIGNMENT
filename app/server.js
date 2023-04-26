const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routers/users');
const groupRouter = require('./routers/groups');

const url = "mongodb+srv://sclegacyrules32:hREYkaKOwQDVWuiU@cluster0.mw8o2kv.mongodb.net/?retryWrites=true&w=majority"

const app = express();
const ngrok = require('ngrok');

mongoose.connect(url, {useNewUrlParser: true})

const con = mongoose.connection

con.on('open', () =>{
    console.log('connected...')
})

app.use(express.json())

app.use('/users', userRouter);
app.use('/groups', groupRouter);

const server = app.listen(9000, () =>{
    console.log('server is running...')
})

module.exports = server