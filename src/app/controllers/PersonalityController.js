import * as Yup from 'yup';

import Personality from '../models/Personality';

class PersonalityController {
  async get(req, res) {
    const personalities = await Personality.findAll({
      attributes: ['id', 'name'],
    });
    return res.json(personalities);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const personality = await Personality.create(req.body);

    return res.json({ personality });
  }
}

export default new PersonalityController();
