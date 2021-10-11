import Sequelize, { Model } from 'sequelize';

class Idiom extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'idioms',
      }
    );

    return this;
  }
}

export default Idiom;
