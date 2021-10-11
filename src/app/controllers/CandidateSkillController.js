import * as Yup from 'yup';

import CandidateSkill from '../models/CandidateSkill';
import Candidate from '../models/Candidate';
import Skill from '../models/Skill';

class CandidateSkillController {
  async get(req, res) {
    const { candidateId } = req.query;

    const candidateSkill = await CandidateSkill.findOne({
      where: { candidate_id: candidateId },
      include: [{ model: Skill, as: 'skill' }],
    });

    return res.json({ candidateSkill });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      candidateId: Yup.number().required(),
      skillId: Yup.number().required(),
      level: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { candidateId, skillId, level } = req.body;

    const candidateExist = await Candidate.findOne({
      where: { id: candidateId },
    });

    if (!candidateExist)
      return res.status(400).json({ error: 'Non-existent candidate!' });

    const hasSkill = await Skill.findOne({
      where: { id: skillId },
    });

    if (!hasSkill)
      return res.status(400).json({
        error: 'This skill you are trying to register does not exist!',
      });

    const alreadyRegisteredSkill = await CandidateSkill.findOne({
      where: { candidate_id: candidateId, skill_id: skillId },
    });

    if (alreadyRegisteredSkill)
      return res.status(400).json({
        error: 'This skill has already been registered for this user!',
      });

    const candidateSkill = await CandidateSkill.create({
      candidate_id: candidateId,
      skill_id: skillId,
      level,
    });

    return res.json({ candidateSkill });
  }
}

export default new CandidateSkillController();
