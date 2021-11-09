import * as Yup from 'yup';

import Idiom from '../models/Idiom';

class IdiomController {
  async get(req, res) {
    const idioms = await Idiom.findAll({ attributes: ['id', 'name'] });
    return res.json(idioms);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    const { name } = req.body;

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const hasIdiom = await Idiom.findOne({ where: { name } });

    if (hasIdiom)
      return res.status(400).json({
        error: 'This idiom has already been registered!',
      });

    const idiom = await Idiom.create(req.body);

    return res.json({ idiom });
  }
}

export default new IdiomController();
