import Sequelize, { Model } from 'sequelize';

class VacancyIdiom extends Model {
  static init(sequelize) {
    super.init(
      {
        vacancy_id: Sequelize.INTEGER,
        idiom_id: Sequelize.INTEGER,
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'vacancy_idioms',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Idiom, {
      foreignKey: 'id',
      sourceKey: 'idiom_id',
      as: 'idiom',
    });
  }
}

export default VacancyIdiom;
