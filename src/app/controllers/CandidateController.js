import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
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
    const { userId } = req.query;

    const candidate = await Candidate.findOne({
      where: { user_id: userId },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'type'],
          include: [
            { model: File, as: 'avatar', attributes: ['name', 'path'] },
          ],
        },
        {
          model: CandidateJob,
          as: 'candidateJob',
          attributes: ['level'],
          include: [{ model: Job, as: 'job', attributes: ['name'] }],
        },
        {
          model: CandidateAvailability,
          as: 'candidateAvailability',
          attributes: ['id'],
          include: [
            { model: Availability, as: 'availability', attributes: ['name'] },
          ],
        },
        {
          model: CandidateCourseTime,
          as: 'candidateCourseTime',
          attributes: ['id'],
          include: [
            { model: CourseTime, as: 'courseTime', attributes: ['name'] },
          ],
        },
        {
          model: CandidatePersonality,
          as: 'candidatePersonality',
          attributes: ['id'],
          include: [
            { model: Personality, as: 'personality', attributes: ['name'] },
          ],
        },
        {
          model: CandidateSkill,
          as: 'candidateSkill',
          attributes: ['id'],
          include: [{ model: Skill, as: 'skill', attributes: ['name'] }],
        },
        {
          model: CandidateIdiom,
          as: 'candidateIdiom',
          attributes: ['id'],
          include: [{ model: Idiom, as: 'idiom', attributes: ['name'] }],
        },
      ],
    });

    return res.json({ candidate });
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
