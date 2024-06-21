const prisma = require('../models/prisma');
const { BadRequest, NotFound } = require('../models/error');
const { CreateMeetupDto } = require('../DTO/meetupDTO');

class MeetupService {
  async getAllMeetups() {
    const meetups = await prisma.meetups.findMany();
    return meetups;
  }

  async getMeetupByID(meetupID) {
    const meetup = await prisma.meetups.findFirst({
      where: { id: parseInt(meetupID) },
    });
    if (meetup === null) {
      throw new NotFound();
    }
    return meetup;
  }

  async createMeetup(meetupDto) {
    const validatedDto = new CreateMeetupDto(meetupDto);
    const createdMeetup = await prisma.meetups.create({
      data: {
        name: validatedDto.name,
        description: validatedDto.description,
        tags: validatedDto.tags,
        date: new Date(validatedDto.date),
        location: validatedDto.location,
      },
    });
    return createdMeetup;
  }

  async updateMeetupByID(meetupID, meetupDto) {
    await this.getMeetupByID(meetupID);
    const validatedDto = new CreateMeetupDto(meetupDto);
    const updatedMeetup = await prisma.meetups.update({
      where: { id: parseInt(meetupID) },
      data: {
        name: validatedDto.name,
        description: validatedDto.description,
        tags: validatedDto.tags,
        date: new Date(validatedDto.date),
        location: validatedDto.location,
      },
    });
    return updatedMeetup;
  }

  async deleteMeetupByID(meetupID) {
    await this.getMeetupByID(meetupID);
    const deletedMeetup = prisma.meetups.delete({
      where: { id: parseInt(meetupID) },
    });
    return deletedMeetup;
  }
}

module.exports = new MeetupService();