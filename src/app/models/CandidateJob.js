import Sequelize, { Model } from 'sequelize';

class CandidateJob extends Model {
  static init(sequelize) {
    super.init(
      {
        candidate_id: Sequelize.INTEGER,
        job_id: Sequelize.INTEGER,
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'candidate_jobs',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Job, {
      foreignKey: 'id',
      sourceKey: 'job_id',
      as: 'job',
    });
  }
}

export default CandidateJob;
