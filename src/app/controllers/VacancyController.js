import * as Yup from 'yup';

import Vacancy from '../models/Vacancy';
import User from '../models/User';
import File from '../models/File';
import VacancyPersonality from '../models/VacancyPersonality';
import Personality from '../models/Personality';
import VacancySkill from '../models/VacancySkill';
import Skill from '../models/Skill';
import VacancyIdiom from '../models/VacancyIdiom';
import Idiom from '../models/Idiom';

class VacancyController {
  async get(req, res) {
    const vacancies = await Vacancy.findAll({
      attributes: ['id', 'title', 'description', 'salary', 'quantity'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'type'],
          include: [
            { model: File, as: 'avatar', attributes: ['name', 'path'] },
          ],
        },
        {
          model: VacancyPersonality,
          as: 'vacancyPersonality',
          attributes: ['id'],
          include: [
            { model: Personality, as: 'personality', attributes: ['name'] },
          ],
        },
        {
          model: VacancySkill,
          as: 'vacancySkill',
          attributes: ['id', 'level'],
          include: [{ model: Skill, as: 'skill', attributes: ['name'] }],
        },
        {
          model: VacancyIdiom,
          as: 'vacancyIdiom',
          attributes: ['id', 'level'],
          include: [{ model: Idiom, as: 'idiom', attributes: ['name'] }],
        },
      ],
    });
    return res.json({ vacancies });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
      title: Yup.string().required().max(50),
      description: Yup.string().required().max(300),
      salary: Yup.number().required(),
      quantity: Yup.number().required(),
    });

    const { userId: user_id, title, description, salary, quantity } = req.body;

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const hasVacancy = await Vacancy.findOne({
      where: { user_id, title, description, salary, quantity },
    });

    if (hasVacancy)
      return res.status(400).json({
        error: 'This vacancy has already been registered!',
      });

    const vacancy = await Vacancy.create({
      user_id,
      title,
      description,
      salary,
      quantity,
    });

    return res.json({ vacancy });
  }
}

export default new VacancyController();
