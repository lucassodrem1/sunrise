const express = require('express');
const messageRouter = require('./routes/messageRouter');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use('/api/v1/messages', messageRouter);

app.use(errorController);

module.exports = app;
