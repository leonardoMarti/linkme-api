import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Address from '../app/models/Address';
import File from '../app/models/File';
import Candidate from '../app/models/Candidate';
import Job from '../app/models/Job';
import CandidateJob from '../app/models/CandidateJob';
import Availability from '../app/models/Availability';
import CandidateAvailability from '../app/models/CandidateAvailability';
import CourseTime from '../app/models/CourseTime';
import CandidateCourseTime from '../app/models/CandidateCourseTime';
import Personality from '../app/models/Personality';
import CandidatePersonality from '../app/models/CandidatePersonality';
import Skill from '../app/models/Skill';

const models = [
  User,
  Address,
  File,
  Candidate,
  Job,
  CandidateJob,
  Availability,
  CandidateAvailability,
  CourseTime,
  CandidateCourseTime,
  Personality,
  CandidatePersonality,
  Skill,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => {
        model.associate && model.associate(this.connection.models);
      });
  }
}

export default new Database();
