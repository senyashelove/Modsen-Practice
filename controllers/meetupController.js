const MeetupService = require('../services/meetupService');
const { BadRequest, NotFound } = require('../models/error');

class MeetupController {
  async getAllMeetups(req, res, next) {
    try {
      const meetups = await MeetupService.getAllMeetups();
      res.json(meetups);
    } catch (error) {
      next(error);
    }
  }

  async getMeetupByID(req, res, next) {
    const { meetupID } = req.params;
    try {
      const meetup = await MeetupService.getMeetupByID(meetupID);
      res.json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async createMeetup(req, res, next) {
    const meetupDto = req.body;
    try {
      const createdMeetup = await MeetupService.createMeetup(meetupDto);
      res.json(createdMeetup);
    } catch (error) {
      if (error instanceof BadRequest) {
        res.status(400).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }

  async updateMeetupByID(req, res, next) {
    const { meetupID } = req.params;
    const meetupDto = req.body;
    try {
      const updatedMeetup = await MeetupService.updateMeetupByID(meetupID, meetupDto);
      res.json(updatedMeetup);
    } catch (error) {
      if (error instanceof BadRequest || error instanceof NotFound) {
        res.status(400).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }

  async deleteMeetupByID(req, res, next) {
    const { meetupID } = req.params;
    try {
      const deletedMeetup = await MeetupService.deleteMeetupByID(meetupID);
      res.json(deletedMeetup);
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({ error: error.message });
      } else {
        next(error);
      }
    }
  }
}

module.exports = new MeetupController();