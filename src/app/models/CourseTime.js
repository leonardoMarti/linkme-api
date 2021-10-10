import Sequelize, { Model } from 'sequelize';

class CourseTime extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'course_time',
      }
    );

    return this;
  }
}

export default CourseTime;
