import Sequelize, { Model } from 'sequelize';

class Vacancy extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        salary: Sequelize.DECIMAL,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'vacancies',
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
    this.hasMany(models.VacancyPersonality, {
      foreignKey: 'vacancy_id',
      sourceKey: 'id',
      as: 'vacancyPersonality',
    });
    this.hasMany(models.VacancySkill, {
      foreignKey: 'vacancy_id',
      sourceKey: 'id',
      as: 'vacancySkill',
    });
  }
}

export default Vacancy;
