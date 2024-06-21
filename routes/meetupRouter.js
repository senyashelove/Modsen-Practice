const express = require('express');
const meetupRouter = express.Router();
const controller = require('../controllers/meetupController');

meetupRouter.get('/', controller.getAllMeetups);
meetupRouter.get('/:meetupID', controller.getMeetupByID);
meetupRouter.post('/create', controller.createMeetup);
meetupRouter.put('/:meetupID', controller.updateMeetupByID);
meetupRouter.delete('/:meetupID', controller.deleteMeetupByID);

module.exports = meetupRouter;