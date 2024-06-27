const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { MeetupDto, CreateMeetupDto } = require('../DTO/meetupDTO');
const { validate } = require('class-validator');
const ApiError = require('../models/error');

class MeetupController {
  async getAllMeetups(req, res, next) {
    try {
      const { name, filters, sortBy, size, page } = req.query;
      let filterArr = [];
      if (filters) {
        filterArr = filters.split(',');
      }
      const meetups = await prisma.meetups.findMany({
        where: {
          name: {
            contains: name,
          },
          tags: filterArr.length > 0 ? { hasSome: filterArr } : undefined,
        },
        orderBy: {
          name: sortBy == 'asc' || sortBy == 'desc' ? sortBy : undefined,
        },
        skip: page && size ? parseInt(page - 1) * parseInt(size) : undefined,
        take: page && size ? parseInt(size) : undefined,
      });
      res.json(meetups);
    } catch (error) {
      next(error);
    }
  }

  async getMeetupByID(req, res, next) {
    const { meetupID } = req.params;
    try {
      const meetup = await prisma.meetups.findFirst({
        where: {
          id: parseInt(meetupID),
        },
      });
      res.json(meetup);
    } catch (error) {
      next(error);
    }
  }

  async createMeetup(req, res, next) {
    const meetup = req.body;
    try {
      const createMeetupDto = new CreateMeetupDto(meetup);
      const errors = await validate(createMeetupDto);

      if (errors.length > 0) {
        throw new ApiError('Validation error', 400, errors);
      }

      const newMeetup = await prisma.meetups.create({
        data: {
          name: meetup.name,
          description: meetup.description,
          tags: meetup.tags,
          date: new Date(meetup.date),
          location: meetup.location,
          userId: parseInt(req.user.id),
        },
      });
      res.json(newMeetup);
    } catch (error) {
      next(error);
    }
  }

  async updateMeetupByID(req, res, next) {
    const { meetupID } = req.params;
    const meetup = req.body;
    try {
      const createMeetupDto = new CreateMeetupDto(meetup);
      const errors = await validate(createMeetupDto);

      if (errors.length > 0) {
        throw new ApiError('Validation error', 400, errors);
      }

      const newMeetup = await prisma.meetups.update({
        where: {
          id: parseInt(meetupID),
        },
        data: {
          name: meetup.name,
          description: meetup.description,
          tags: meetup.tags,
          date: new Date(meetup.date),
          location: meetup.location,
        },
      });
      res.json(newMeetup);
    } catch (error) {
      next(error);
    }
  }

  async deleteMeetupByID(req, res, next) {
    const { meetupID } = req.params;
    try {
      await prisma.meetups.delete({
        where: {
          id: parseInt(meetupID),
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeetupController();