import * as Yup from 'yup';

import CourseTime from '../models/CourseTime';

class CourseTimeController {
  async get(req, res) {
    const courseTime = await CourseTime.findAll({ attributes: ['id', 'name'] });
    return res.json(courseTime);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { id, name } = await CourseTime.create(req.body);

    return res.json({ id, name });
  }
}

export default new CourseTimeController();
