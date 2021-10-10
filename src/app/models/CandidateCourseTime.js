import Sequelize, { Model } from 'sequelize';

class CandidateCourseTime extends Model {
  static init(sequelize) {
    super.init(
      {
        candidate_id: Sequelize.INTEGER,
        course_time_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'candidate_course_time',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.CourseTime, {
      foreignKey: 'id',
      sourceKey: 'course_time_id',
      as: 'courseTime',
    });
  }
}

export default CandidateCourseTime;
