import * as Yup from 'yup';

import CandidatePersonality from '../models/CandidatePersonality';
import Candidate from '../models/Candidate';
import Personality from '../models/Personality';

class CandidatePersonalityController {
  async get(req, res) {
    const { candidateId } = req.query;

    console.log('candidateId', candidateId);

    const candidatePersonality = await CandidatePersonality.findOne({
      where: { candidate_id: candidateId },
      include: [{ model: Personality, as: 'personality' }],
    });

    return res.json({ candidatePersonality });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      candidateId: Yup.number().required(),
      personalityId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { candidateId, personalityId } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { id: candidateId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const hasPersonality = await Personality.findOne({
      where: { id: personalityId },
    });

    if (!hasPersonality)
      return res.status(400).json({
        error: 'This job personality does not exist!',
      });

    const alreadyRegisteredPersonality = await CandidatePersonality.findOne({
      where: { candidate_id: candidateId, personality_id: personalityId },
    });

    if (alreadyRegisteredPersonality)
      return res.status(400).json({
        error: 'This personality has already been registered for this user!',
      });

    const { candidate_id, personality_id } = await CandidatePersonality.create({
      candidate_id: candidateId,
      personality_id: personalityId,
    });

    return res.json({ candidate_id, personality_id });
  }
}

export default new CandidatePersonalityController();
