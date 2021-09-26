import * as Yup from 'yup';

import User from '../models/User';
import Candidate from '../models/Candidate';
import CandidateJob from '../models/CandidateJob';
import Job from '../models/Job';

class CandidateController {
  async get(req, res) {
    const { userId } = req.query;

    const candidate = await Candidate.findOne({
      where: { user_id: userId },
      include: [
        { model: User, as: 'user' },
        {
          model: CandidateJob,
          as: 'candidateJob',
          include: [{ model: Job, as: 'job' }],
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
