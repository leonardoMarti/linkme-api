import Sequelize, { Model } from 'sequelize';

class CandidateSkills extends Model {
  static init(sequelize) {
    super.init(
      {
        candidate_id: Sequelize.INTEGER,
        skill_id: Sequelize.INTEGER,
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'candidate_skills',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Skill, {
      foreignKey: 'id',
      sourceKey: 'skill_id',
      as: 'skill',
    });
  }
}

export default CandidateSkills;
