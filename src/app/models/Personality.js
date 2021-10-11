import Sequelize, { Model } from 'sequelize';

class Personality extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'personalities',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.CandidatePersonality, {
      foreignKey: 'id',
      as: 'personality',
    });
  }
}

export default Personality;
