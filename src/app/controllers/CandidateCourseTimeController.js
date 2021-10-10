import * as Yup from 'yup';

import CandidateCourseTime from '../models/CandidateCourseTime';
import Candidate from '../models/Candidate';
import CourseTime from '../models/CourseTime';

class CandidateCourseTimeController {
  async get(req, res) {
    const { candidateId } = req.query;

    const candidateCourseTime = await CandidateCourseTime.findOne({
      where: { candidate_id: candidateId },
      attributes: ['id', 'candidate_id', 'course_time_id'],
      include: [
        { model: CourseTime, as: 'courseTime', attributes: ['id', 'name'] },
      ],
    });

    return res.json({ candidateCourseTime });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      candidateId: Yup.number().required(),
      courseTimeId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { candidateId, courseTimeId } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { id: candidateId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const hasCourseTime = await CourseTime.findOne({
      where: { id: courseTimeId },
    });

    if (!hasCourseTime)
      return res.status(400).json({
        error: 'This course time does not exist!',
      });

    const alreadyRegisteredCourseTime = await CandidateCourseTime.findOne({
      where: { candidate_id: candidateId, course_time_id: courseTimeId },
    });

    if (alreadyRegisteredCourseTime)
      return res.status(400).json({
        error: 'This course time has already been registered for this user!',
      });

    const { candidate_id, course_time_id } = await CandidateCourseTime.create({
      candidate_id: candidateId,
      course_time_id: courseTimeId,
    });

    return res.json({ candidate_id, course_time_id });
  }
}

export default new CandidateCourseTimeController();
