import * as Yup from 'yup';

import User from '../models/User';
import Candidate from '../models/Candidate';
import CandidateJob from '../models/CandidateJob';
import Job from '../models/Job';
import File from '../models/File';

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
