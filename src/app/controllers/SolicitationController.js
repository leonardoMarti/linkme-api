import * as Yup from 'yup';

import { TRANSLATE_SOLICITATION } from '../../constants/translate';

import Solicitation from '../models/Solicitation';
import Notification from '../models/Notification';
import User from '../models/User';
import Vacancy from '../models/Vacancy';
import Candidate from '../models/Candidate';
import Vacancy from '../models/Vacancy';

class SolicitationController {
  async get(req, res) {
    const solicitation = await Solicitation.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Notification,
          as: 'notification',
          attributes: ['notify'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
          include: [
            {
              model: Vacancy,
              as: 'vacancy',
              attributes: ['title', 'description', 'salary', 'quantity'],
            },
          ],
        },
      ],
    });

    return res.json(solicitation);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
      vacancyId: Yup.number().required(),
      sentBy: Yup.string().required(),
      status: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ error: TRANSLATE_SOLICITATION.validateFail });

    const { userId, vacancyId, sentBy, status } = req.body;

    const hasCandidate = await Candidate.findByPk(userId);

    if (!hasCandidate)
      return res
        .status(404)
        .json({ error: TRANSLATE_SOLICITATION.candidateDontExists });

    const hasVacancy = await Vacancy.findByPk(vacancyId);

    if (!hasVacancy)
      return res
        .status(404)
        .json({ error: TRANSLATE_SOLICITATION.vacancyDontExists });

    const hasSolicitation = await Solicitation.findOne({
      where: { user_id: userId, vacancy_id: vacancyId },
    });

    if (hasSolicitation)
      return res
        .status(400)
        .json({ error: TRANSLATE_SOLICITATION.alreadyExists });

    const response = await Solicitation.create({
      user_id: userId,
      vacancy_id: vacancyId,
      sent_by: sentBy,
      status,
    });

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
      vacancyId: Yup.number().required(),
      status: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ error: TRANSLATE_SOLICITATION.validateFail });

    const { userId, vacancyId, status } = req.body;

    const solicitation = await Solicitation.findOne({
      where: { user_id: userId, vacancy_id: vacancyId },
    });

    if (!solicitation)
      return res.status(400).json({ error: TRANSLATE_SOLICITATION.dontHave });

    const response = await solicitation.update(
      { status },
      {
        where: { user_id: userId, vacancy_id: vacancyId },
      }
    );

    return res.json(response);
  }
}

export default new SolicitationController();
