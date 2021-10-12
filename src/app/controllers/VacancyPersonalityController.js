import * as Yup from 'yup';

import VacancyPersonality from '../models/VacancyPersonality';
import Vacancy from '../models/Vacancy';
import Personality from '../models/Personality';

class VacancyPersonalityController {
  async get(req, res) {
    const { vacancyId } = req.query;
    let queryObj;

    if (vacancyId) queryObj = { where: { vacancy_id: vacancyId } };

    const response = await VacancyPersonality.findAll({
      ...queryObj,
      include: [{ model: Personality, as: 'personality' }],
    });

    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      vacancyId: Yup.number().required(),
      personalityId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { vacancyId, personalityId } = req.body;

    const vacancyExist = await Vacancy.findOne({
      where: { id: vacancyId },
    });

    if (!vacancyExist)
      return res.status(400).json({ error: 'Non-existent vacancy!' });

    const hasPersonality = await Personality.findOne({
      where: { id: personalityId },
    });

    if (!hasPersonality)
      return res.status(400).json({
        error: 'This job personality does not exist!',
      });

    const alreadyRegisteredRelation = await VacancyPersonality.findOne({
      where: { vacancy_id: vacancyId, personality_id: personalityId },
    });

    if (alreadyRegisteredRelation)
      return res.status(400).json({
        error: 'This relation has already been registered for this vacancy!',
      });

    const { vacancy_id, personality_id } = await VacancyPersonality.create({
      vacancy_id: vacancyId,
      personality_id: personalityId,
    });

    return res.json({ vacancy_id, personality_id });
  }
}

export default new VacancyPersonalityController();
