import * as Yup from 'yup';

import VacancySkill from '../models/VacancySkill';
import Vacancy from '../models/Vacancy';
import Skill from '../models/Skill';

class VacancySkillController {
  async get(req, res) {
    const { vacancyId } = req.query;
    let queryObj;

    if (vacancyId) queryObj = { where: { vacancy_id: vacancyId } };

    const vacancySkill = await VacancySkill.findAll({
      ...queryObj,
      include: [{ model: Skill, as: 'skill' }],
    });

    return res.json({ vacancySkill });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      vacancyId: Yup.number().required(),
      skillId: Yup.number().required(),
      level: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { vacancyId, skillId, level } = req.body;

    const vacancyExist = await Vacancy.findOne({
      where: { id: vacancyId },
    });

    if (!vacancyExist)
      return res.status(400).json({ error: 'Non-existent vacancy!' });

    const hasSkill = await Skill.findOne({
      where: { id: skillId },
    });

    if (!hasSkill)
      return res.status(400).json({
        error: 'This skill you are trying to register does not exist!',
      });

    const alreadyRegisteredRelation = await VacancySkill.findOne({
      where: { vacancy_id: vacancyId, skill_id: skillId },
    });

    if (alreadyRegisteredRelation)
      return res.status(400).json({
        error: 'This relation has already been registered for this vacancy!',
      });

    const vacancySkill = await VacancySkill.create({
      vacancy_id: vacancyId,
      skill_id: skillId,
      level,
    });

    return res.json({ vacancySkill });
  }
}

export default new VacancySkillController();
