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

    const { candidateId, jobId, level } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { id: candidateId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const hasJob = await Job.findOne({
      where: { id: jobId },
    });

    if (!hasJob)
      return res.status(400).json({
        error: 'This job you are trying to register does not exist!',
      });

    const alreadyRegisteredJob = await CandidateJob.findOne({
      where: { candidate_id: candidateId, job_id: jobId },
    });

    if (alreadyRegisteredJob)
      return res.status(400).json({
        error: 'This work has already been registered for this user!',
      });

    const candidateJob = await CandidateJob.create({
      candidate_id: candidateId,
      job_id: jobId,
      level,
    });

    return res.json({ candidateJob });
  }
}

export default new CandidateJobController();
