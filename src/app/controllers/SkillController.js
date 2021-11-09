import * as Yup from 'yup';

import Skill from '../models/Skill';

class SkillController {
  async get(req, res) {
    const skills = await Skill.findAll({ attributes: ['id', 'name'] });
    return res.json(skills);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const skill = await Skill.create(req.body);

    return res.json({ skill });
  }
}

export default new SkillController();
