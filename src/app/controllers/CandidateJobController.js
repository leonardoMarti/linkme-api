import * as Yup from 'yup';

import CandidateJob from '../models/CandidateJob';
import Candidate from '../models/Candidate';
import Job from '../models/Job';

class CandidateJobController {
  async get(req, res) {
    const { candidateId } = req.query;

    const candidateJob = await CandidateJob.findOne({
      where: { candidate_id: candidateId },
      include: [{ model: Job, as: 'job' }],
    });

    return res.json({ candidateJob });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      candidateId: Yup.number().required(),
      jobId: Yup.number().required(),
      level: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { userId } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { user_id: userId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const candidateJob = await CandidateJob.create({
      candidate_id: candidateId,
      job_id: jobId,
      level,
    });

    return res.json({ candidateJob });
  }
}

export default new CandidateJobController();
