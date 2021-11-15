import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import Address from '../models/Address';
import Candidate from '../models/Candidate';
import CandidateJob from '../models/CandidateJob';
import Job from '../models/Job';
import Availability from '../models/Availability';
import CandidateAvailability from '../models/CandidateAvailability';
import CourseTime from '../models/CourseTime';
import CandidateCourseTime from '../models/CandidateCourseTime';
import Personality from '../models/Personality';
import CandidatePersonality from '../models/CandidatePersonality';
import Skill from '../models/Skill';
import CandidateSkill from '../models/CandidateSkill';
import Idiom from '../models/Idiom';
import CandidateIdiom from '../models/CandidateIdiom';

class CandidateController {
  async get(req, res) {
    const { userId, limit, offset } = req.query;

    let queryObj;

    if (userId) queryObj = { where: { user_id: userId } };

    const candidate = await Candidate.findAll({
      ...queryObj,
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'type'],
          include: [
            { model: File, as: 'avatar', attributes: ['name', 'path'] },
            {
              model: Address,
              as: 'address',
              attributes: ['city', 'state', 'neighborhood'],
            },
          ],
        },
        {
          model: CandidateJob,
          as: 'job',
          attributes: ['level'],
          include: [{ model: Job, as: 'job', attributes: ['id', 'name'] }],
        },
        {
          model: CandidateAvailability,
          as: 'availability',
          attributes: ['id'],
          order: [['id', 'ASC']],
          include: [
            {
              model: Availability,
              as: 'availability',
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: CandidateCourseTime,
          as: 'courseTime',
          attributes: ['id'],
          include: [
            { model: CourseTime, as: 'courseTime', attributes: ['id', 'name'] },
          ],
        },
        {
          model: CandidatePersonality,
          as: 'personality',
          attributes: ['id'],
          include: [
            {
              model: Personality,
              as: 'personality',
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: CandidateSkill,
          as: 'skill',
          attributes: ['id', 'level'],
          include: [{ model: Skill, as: 'skill', attributes: ['id', 'name'] }],
        },
        {
          model: CandidateIdiom,
          as: 'idiom',
          attributes: ['id', 'level'],
          include: [{ model: Idiom, as: 'idiom', attributes: ['id', 'name'] }],
        },
      ],
      order: [
        [{ model: User, as: 'user' }, 'name', 'ASC'],
        [{ model: CandidateAvailability, as: 'availability' }, 'id', 'ASC'],
      ],
      limit,
      offset,
    });

    return res.json(candidate);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { userId } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { user_id: userId },
    });

    if (candidateExist)
      return res.status(400).json({ error: 'Candidate already exists!' });

    const candidate = await Candidate.create({ user_id: userId });

    return res.json({ candidate });
  }
}

export default new CandidateController();
