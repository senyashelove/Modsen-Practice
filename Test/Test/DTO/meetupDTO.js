const { IsString, IsArray, ArrayMinSize, IsISO8601 } = require('class-validator');
const ApiError = require('../models/error');

class MeetupDto {
  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.tags = model.tags;
    this.date = model.date;
    this.location = model.location;
  }
}

class CreateMeetupDto extends MeetupDto {
  constructor(model) {
    super(model);
    this.validate();
  }

  validate() {
    if (!IsString(this.name)) {
      throw new ApiError('Invalid name');
    }

    if (!IsString(this.description)) {
      throw new ApiError('Invalid description');
    }

    if (!Array.isArray(this.tags) || this.tags.length < 1) {
      throw new ApiError('Invalid tags');
    }

    if (!IsISO8601(this.date)) {
      throw new ApiError('Invalid date');
    }

    if (!IsString(this.location)) {
      throw new ApiError('Invalid location');
    }
  }
}

module.exports = {
  MeetupDto,
  CreateMeetupDto,
};