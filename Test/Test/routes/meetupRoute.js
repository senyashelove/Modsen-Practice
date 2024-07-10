const express = require('express');
const meetupRouter = express.Router();
const controller = require('../controllers/meetupController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

meetupRouter.get('/', authMiddleware, controller.getAllMeetups);
meetupRouter.get('/:meetupID', authMiddleware, controller.getMeetupByID);
meetupRouter.post('/', authMiddleware, checkRole, controller.createMeetup);
meetupRouter.put('/:meetupID', authMiddleware,checkRole, controller.updateMeetupByID);
meetupRouter.delete('/:meetupID', authMiddleware,checkRole, controller.deleteMeetupByID);
meetupRouter.post('/:meetupID/join',authMiddleware, controller.joinMeetup);

module.exports = meetupRouter;