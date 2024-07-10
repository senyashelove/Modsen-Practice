const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const meetupRouter = require('./routes/meetupRoute');
const authRouter = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); // Replace with the path to your YAML file

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/meetups', meetupRouter);
app.use('/auth', authRouter);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log(`App listening on port ${3000}`));