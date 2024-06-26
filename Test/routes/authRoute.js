const express = require("express");
const authRouter = express.Router();
const controller = require("../controllers/authController.js");
const { check } = require('express-validator');


authRouter.post('/registration', controller.registration);
authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.put('/update', controller.update);
authRouter.get('/refresh', controller.refresh);

module.exports = authRouter;