import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Address from '../app/models/Address';
import File from '../app/models/File';
import Candidate from '../app/models/Candidate';
import Job from '../app/models/Job';
import CandidateJob from '../app/models/CandidateJob';

const models = [User, Address, File, Candidate, Job, CandidateJob];

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
