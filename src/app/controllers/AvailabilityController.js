import * as Yup from 'yup';

import Availability from '../models/Availability';

class AvailabilityController {
  async get(req, res) {
    const availabilities = await Availability.findAll({
      attributes: ['id', 'name'],
    });
    return res.json(availabilities);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const availability = await Availability.create(req.body);

    return res.json({ availability });
  }
}

export default new AvailabilityController();
