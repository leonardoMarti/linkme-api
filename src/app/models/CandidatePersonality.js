import Sequelize, { Model } from 'sequelize';

class CandidatePersonality extends Model {
  static init(sequelize) {
    super.init(
      {
        candidate_id: Sequelize.INTEGER,
        personality_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'candidate_personalities',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Personality, {
      foreignKey: 'id',
      sourceKey: 'personality_id',
      as: 'personality',
    });
  }
}

export default CandidatePersonality;
