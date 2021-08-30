import Sequelize, { Model } from 'sequelize';

class Candidate extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
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
  }
}

export default Candidate;
