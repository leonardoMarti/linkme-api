import * as Yup from 'yup';

import User from '../models/User';
import Candidate from '../models/Candidate';

class CandidateController {
  async get(req, res) {
    const { userId } = req.query;

    const candidate = await Candidate.findOne({
      where: { user_id: userId },
      include: [{ model: User, as: 'user' }],
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
    console.log('userId', userId);

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
