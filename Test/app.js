const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const meetupRouter = require('./routes/meetupRouter');
const errorMiddleware = require('./middleware/errorMiddleware');
const app = express();
app.use(bodyParser.json());
app.use(errorMiddleware);

app.use('/meet', meetupRouter);

app.listen(3000, () => console.log(`Cервер работает на порту ${3000}`))