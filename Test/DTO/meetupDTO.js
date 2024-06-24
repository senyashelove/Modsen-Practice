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
  @IsString()
  name;

  @IsString()
  description;

  @IsArray()
  @ArrayMinSize(1)
  tags;

  @IsISO8601()
  date;

  @IsString()
  location;

  constructor(model) {
    super(model);
  }
}

module.exports = {
  MeetupDto,
  CreateMeetupDto,
};