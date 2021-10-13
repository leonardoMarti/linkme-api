import Sequelize, { Model } from 'sequelize';

class VacancySkill extends Model {
  static init(sequelize) {
    super.init(
      {
        vacancy_id: Sequelize.INTEGER,
        skill_id: Sequelize.INTEGER,
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'vacancy_skills',
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

export default VacancySkill;
