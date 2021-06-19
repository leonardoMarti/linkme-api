import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: Sequelize.INTEGER,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Address;
