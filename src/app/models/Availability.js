import Sequelize, { Model } from 'sequelize';

class Availability extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'availabilities',
      }
    );

    return this;
  }
}

export default Availability;
