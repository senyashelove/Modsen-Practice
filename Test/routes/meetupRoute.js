const express = require('express');
const meetupRouter = express.Router();
const controller = require('../controllers/meetupController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

meetupRouter.get('/', controller.getAllMeetups);
meetupRouter.get('/:meetupID', controller.getMeetupByID);
meetupRouter.post('/', checkRole,  controller.createMeetup);
meetupRouter.put('/:meetupID', checkRole, controller.updateMeetupByID);
meetupRouter.delete('/:meetupID', checkRole, controller.deleteMeetupByID);
meetupRouter.post('/:meetupID/join',authMiddleware, controller.joinMeetup);

module.exports = meetupRouter;