import Sequelize, { Model } from 'sequelize';

class VacancyPersonality extends Model {
  static init(sequelize) {
    super.init(
      {
        vacancy_id: Sequelize.INTEGER,
        personality_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'vacancy_personalities',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Personality, {
      foreignKey: 'id',
      sourceKey: 'personality_id',
      as: 'personality',
    });
  }
}

export default VacancyPersonality;
