import Sequelize, { Model } from 'sequelize';

class Candidate extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'candidates',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'id',
      sourceKey: 'user_id',
      as: 'user',
    });
    this.hasMany(models.CandidateJob, {
      foreignKey: 'candidate_id',
      sourceKey: 'id',
      as: 'job',
    });
    this.hasMany(models.CandidateAvailability, {
      foreignKey: 'candidate_id',
      sourceKey: 'id',
      as: 'availability',
    });
    this.hasMany(models.CandidateCourseTime, {
      foreignKey: 'candidate_id',
      sourceKey: 'id',
      as: 'courseTime',
    });
    this.hasMany(models.CandidatePersonality, {
      foreignKey: 'candidate_id',
      sourceKey: 'id',
      as: 'personality',
    });
    this.hasMany(models.CandidateSkill, {
      foreignKey: 'candidate_id',
      sourceKey: 'id',
      as: 'skill',
    });
    this.hasMany(models.CandidateIdiom, {
      foreignKey: 'candidate_id',
      sourceKey: 'id',
      as: 'idiom',
    });
  }
}

export default Candidate;
