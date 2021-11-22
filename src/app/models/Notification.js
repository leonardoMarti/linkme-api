import Sequelize, { Model } from 'sequelize';

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        solicitation_id: Sequelize.INTEGER,
        notify: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'notifications',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Solicitation, {
      foreignKey: 'id',
      sourceKey: 'solicitation_id',
      as: 'solicitation',
    });
  }
}

export default Notification;
