import Sequelize, { Model } from 'sequelize';

class CandidateAvailability extends Model {
  static init(sequelize) {
    super.init(
      {
        candidate_id: Sequelize.INTEGER,
        availability_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Availability, {
      foreignKey: 'id',
      sourceKey: 'availability_id',
      as: 'availability',
    });
  }
}

export default CandidateAvailability;
