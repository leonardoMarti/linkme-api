import Sequelize, { Model } from 'sequelize';

class CandidateIdiom extends Model {
  static init(sequelize) {
    super.init(
      {
        candidate_id: Sequelize.INTEGER,
        idiom_id: Sequelize.INTEGER,
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'candidate_idioms',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Idiom, {
      foreignKey: 'id',
      sourceKey: 'idiom_id',
      as: 'idiom',
    });
  }
}

export default CandidateIdiom;
