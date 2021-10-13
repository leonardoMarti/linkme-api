import * as Yup from 'yup';

import VacancyIdiom from '../models/VacancyIdiom';
import Vacancy from '../models/Vacancy';
import Idiom from '../models/Idiom';

class VacancyIdiomController {
  async get(req, res) {
    const { vacancyId } = req.query;
    let queryObj;

    if (vacancyId) queryObj = { where: { vacancy_id: vacancyId } };

    const vacancyIdiom = await VacancyIdiom.findAll({
      ...queryObj,
      include: [{ model: Idiom, as: 'idiom' }],
    });

    return res.json({ vacancyIdiom });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      vacancyId: Yup.number().required(),
      idiomId: Yup.number().required(),
      level: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { vacancyId, idiomId, level } = req.body;

    const vacancyExist = await Vacancy.findOne({
      where: { id: vacancyId },
    });

    if (!vacancyExist)
      return res.status(400).json({ error: 'Non-existent vacancy!' });

    const hasIdiom = await Idiom.findOne({
      where: { id: idiomId },
    });

    if (!hasIdiom)
      return res.status(400).json({
        error: 'This idiom that you are trying to register does not exist!',
      });

    const alreadyRegisteredRelation = await VacancyIdiom.findOne({
      where: { vacancy_id: vacancyId, idiom_id: idiomId },
    });

    if (alreadyRegisteredRelation)
      return res.status(400).json({
        error: 'This relation has already been registered for this vacancy!',
      });

    const vacancyIdiom = await VacancyIdiom.create({
      vacancy_id: vacancyId,
      idiom_id: idiomId,
      level,
    });

    return res.json({ vacancyIdiom });
  }
}

export default new VacancyIdiomController();
