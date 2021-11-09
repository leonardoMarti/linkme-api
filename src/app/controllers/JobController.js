import * as Yup from 'yup';

import Job from '../models/Job';

class JobController {
  async get(req, res) {
    const jobs = await Job.findAll();
    return res.json(jobs);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const job = await Job.create(req.body);

    return res.json({ job });
  }
}

export default new JobController();
