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
}

export default Personality;
