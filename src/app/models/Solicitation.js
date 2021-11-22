import Sequelize, { Model } from 'sequelize';

class Solicitation extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        vacancy_id: Sequelize.INTEGER,
        sent_by: Sequelize.ENUM('company', 'trainee'),
        status: Sequelize.ENUM('pending', 'accept', 'reject'),
      },
      {
        sequelize,
        tableName: 'solicitations',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Notification, {
      sourceKey: 'id',
      foreignKey: 'solicitation_id',
      as: 'notification',
    });
    this.belongsTo(models.User, {
      sourceKey: 'user_id',
      foreignKey: 'id',
      as: 'user',
    });
  }
}

export default Solicitation;
