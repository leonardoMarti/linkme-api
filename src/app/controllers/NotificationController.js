import * as Yup from 'yup';

import { TRANSLATE_NOTIFICATION } from '../../constants/translate';

import Notification from '../models/Notification';
import Solicitation from '../models/Solicitation';

class NotificationController {
  async get(req, res) {
    const response = await Notification.findAll();

    return res.json(response);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      solicitationId: Yup.number().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ error: TRANSLATE_NOTIFICATION.validateFail });

    const { solicitationId } = req.body;

    const hasSolicitation = await Solicitation.findByPk(solicitationId);

    if (!hasSolicitation)
      return res
        .status(404)
        .json({ error: TRANSLATE_NOTIFICATION.solicitationDontExists });

    const hasNotification = await Notification.findOne({
      where: { solicitation_id: solicitationId },
    });

    if (hasNotification)
      return res
        .status(400)
        .json({ error: TRANSLATE_NOTIFICATION.notiticationAlreadyExists });

    const response = await Notification.create({
      solicitation_id: solicitationId,
    });

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      notify: Yup.bool().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ error: TRANSLATE_NOTIFICATION.validateFail });

    const { id, notify } = req.body;

    const notification = await Notification.findByPk(id);

    if (!notification)
      return res.status(400).json({ error: TRANSLATE_NOTIFICATION.dontHave });

    const response = await notification.update(
      { notify },
      {
        where: { notification_id: id },
      }
    );

    return res.json(response);
  }
}

export default new NotificationController();
