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
import CandidateSkill from '../app/models/CandidateSkill';
import Idiom from '../app/models/Idiom';
import CandidateIdiom from '../app/models/CandidateIdiom';
import Vacancy from '../app/models/Vacancy';
import VacancyPersonality from '../app/models/VacancyPersonality';
import VacancySkill from '../app/models/VacancySkill';
import VacancyIdiom from '../app/models/VacancyIdiom';
import Solicitation from '../app/models/Solicitation';
import Notification from '../app/models/Notification';

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
  CandidateSkill,
  Idiom,
  CandidateIdiom,
  Vacancy,
  VacancyPersonality,
  VacancySkill,
  VacancyIdiom,
  Solicitation,
  Notification,
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
