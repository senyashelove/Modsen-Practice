const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const meetupRouter = require('./routes/meetupRoute');
const authRouter = require('./routes/authRoute');
const app = express();


app.use(bodyParser.json());

app.use('/meetups', meetupRouter);
app.use('/auth', authRouter);

app.listen(3000, () => console.log(`App listening on port ${3000}`))