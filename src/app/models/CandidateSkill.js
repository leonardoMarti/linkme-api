import Sequelize, { Model } from 'sequelize';

class CandidateSkill extends Model {
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
    this.hasOne(models.Skill, {
      foreignKey: 'id',
      sourceKey: 'skill_id',
      as: 'skill',
    });
  }
}

export default CandidateSkill;
