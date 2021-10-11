import Sequelize, { Model } from 'sequelize';

class Skill extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'skills',
      }
    );

    return this;
  }
}

export default Skill;
