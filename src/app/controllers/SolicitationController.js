import * as Yup from 'yup';

import { TRANSLATE_SOLICITATION } from '../../constants/translate';
import { SOLICITATION_STATUS, ENUM_USER_TYPE } from '../../constants/enumerate';

import Solicitation from '../models/Solicitation';
import Notification from '../models/Notification';
import User from '../models/User';
import Vacancy from '../models/Vacancy';

class SolicitationController {
  async get(req, res) {
    console.log('req.query', req.query);

    const { type } = req.query;

    const traineeQuery =
      type === ENUM_USER_TYPE.trainee ? { user_id: req.userId } : null;
    const companyQuery =
      type === ENUM_USER_TYPE.company ? { id: req.userId } : null;

    const solicitation = await Solicitation.findAll({
      where: traineeQuery,
      include: [
        {
          model: Notification,
          as: 'notification',
          attributes: ['id', 'notify'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Vacancy,
          as: 'vacancy',
          attributes: ['id', 'title', 'description', 'salary', 'quantity'],
          include: [
            {
              model: User,
              as: 'user',
              where: companyQuery,
              attributes: ['id', 'name', 'email'],
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

    const hasUser = await User.findByPk(userId);

    if (!hasUser)
      return res
        .status(404)
        .json({ error: TRANSLATE_SOLICITATION.userDontExists });

    const hasVacancy = await Vacancy.findByPk(vacancyId);

    if (!hasVacancy)
      return res
        .status(404)
        .json({ error: TRANSLATE_SOLICITATION.vacancyDontExists });

    const hasSolicitation = await Solicitation.findOne({
      where: {
        user_id: userId,
        vacancy_id: vacancyId,
      },
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

    const { id } = response;

    await Notification.create({ solicitation_id: id, notify: true });

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
