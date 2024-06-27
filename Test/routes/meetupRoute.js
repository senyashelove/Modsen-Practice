const express = require('express');
const meetupRouter = express.Router();
const controller = require('../controllers/meetupController');

meetupRouter.get('/', controller.getAllMeetups);
meetupRouter.get('/:meetupID', controller.getMeetupByID);
meetupRouter.post('/', checkRole,  controller.createMeetup);
meetupRouter.put('/:meetupID', checkRole, controller.updateMeetupByID);
meetupRouter.delete('/:meetupID', checkRole, controller.deleteMeetupByID);

module.exports = meetupRouter;
