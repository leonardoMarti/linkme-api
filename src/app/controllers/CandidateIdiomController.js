import * as Yup from 'yup';

import CandidateIdiom from '../models/CandidateIdiom';
import Candidate from '../models/Candidate';
import Idiom from '../models/Idiom';

class CandidateIdiomController {
  async get(req, res) {
    const { candidateId } = req.query;

    const candidateIdiom = await CandidateIdiom.findOne({
      where: { candidate_id: candidateId },
      include: [{ model: Idiom, as: 'idiom' }],
    });

    return res.json({ candidateIdiom });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      candidateId: Yup.number().required(),
      idiomId: Yup.number().required(),
      level: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { candidateId, idiomId, level } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { id: candidateId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const hasIdiom = await Idiom.findOne({
      where: { id: idiomId },
    });

    if (!hasIdiom)
      return res.status(400).json({
        error: 'This idiom that you are trying to register does not exist!',
      });

    const alreadyRegisteredIdiom = await CandidateIdiom.findOne({
      where: { candidate_id: candidateId, idiom_id: idiomId },
    });

    if (alreadyRegisteredIdiom)
      return res.status(400).json({
        error: 'This idiom has already been registered for this user!',
      });

    const candidateIdiom = await CandidateIdiom.create({
      candidate_id: candidateId,
      idiom_id: idiomId,
      level,
    });

    return res.json({ candidateIdiom });
  }
}

export default new CandidateIdiomController();
