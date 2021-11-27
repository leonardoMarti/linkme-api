import * as Yup from 'yup';

import { TRANSLATE_SOLICITATION } from '../../constants/translate';
import { SOLICITATION_STATUS } from '../../constants/enumerate';

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
          attributes: ['id', 'notify'],
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
      id: Yup.number().required(),
      status: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ error: TRANSLATE_SOLICITATION.validateFail });

    const { id, status } = req.body;

    const solicitation = await Solicitation.findByPk(id);

    if (!solicitation)
      return res.status(400).json({ error: TRANSLATE_SOLICITATION.dontHave });

    if (status === SOLICITATION_STATUS.reject)
      await Notification.update(
        { notify: false },
        { where: { solicitation_id: id } }
      );

    const response = await solicitation.update(
      { status },
      {
        where: { id },
      }
    );

    return res.json(response);
  }
}

export default new SolicitationController();
