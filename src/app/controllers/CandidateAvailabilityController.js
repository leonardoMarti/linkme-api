import * as Yup from 'yup';

import CandidateAvailability from '../models/CandidateAvailability';
import Candidate from '../models/Candidate';
import Availability from '../models/Availability';

class CandidateAvailabilityController {
  async get(req, res) {
    const { candidateId } = req.query;

    console.log('candidateId', candidateId);

    const candidateAvailability = await CandidateAvailability.findOne({
      where: { candidate_id: candidateId },
      include: [{ model: Availability, as: 'availability' }],
    });

    return res.json({ candidateAvailability });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      candidateId: Yup.number().required(),
      availabilityId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { candidateId, availabilityId } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { id: candidateId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const hasAvailability = await Availability.findOne({
      where: { id: availabilityId },
    });

    if (!hasAvailability)
      return res.status(400).json({
        error: 'This job availability does not exist!',
      });

    const alreadyRegisteredAvailability = await CandidateAvailability.findOne({
      where: { candidate_id: candidateId, availability_id: availabilityId },
    });

    if (alreadyRegisteredAvailability)
      return res.status(400).json({
        error: 'This availability has already been registered for this user!',
      });

    const {
      candidate_id,
      availability_id,
    } = await CandidateAvailability.create({
      candidate_id: candidateId,
      availability_id: availabilityId,
    });

    return res.json({ candidate_id, availability_id });
  }
}

export default new CandidateAvailabilityController();
