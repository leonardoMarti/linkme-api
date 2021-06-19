import * as Yup from 'yup';

import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const schema = Yup.object().shape({
      city: Yup.string().required(),
      state: Yup.string().required(),
      neighborhood: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { id_user, city, state, neighborhood } = await Address.create({
      ...req.body,
      id_user: req.userId,
    });

    return res.json({ id_user, city, state, neighborhood });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      city: Yup.string(),
      state: Yup.string(),
      neighborhood: Yup.string(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    await Address.update(req.body, {
      where: { id_user: req.userId },
    });

    return res.json({ id_user: req.userId, ...req.body });
  }
}

export default new AddressController();
