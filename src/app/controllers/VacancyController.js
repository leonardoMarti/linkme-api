import * as Yup from 'yup';

import Vacancy from '../models/Vacancy';
import User from '../models/User';
import File from '../models/File';

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
