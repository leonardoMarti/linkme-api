import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        type: Sequelize.ENUM('company', 'trainee'),
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasOne(models.Address, {
      sourceKey: 'id',
      foreignKey: 'id_user',
      as: 'address',
    });
    this.hasOne(models.Candidate, {
      sourceKey: 'id',
      foreignKey: 'user_id',
      as: 'candidate',
    });
    this.hasOne(models.Vacancy, {
      sourceKey: 'id',
      foreignKey: 'user_id',
      as: 'vacancy',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
