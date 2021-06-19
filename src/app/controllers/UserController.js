import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist)
      return res.status(400).json({ error: 'User already exists!' });

    const { id, name, email, type } = await User.create(req.body);

    return res.json({ id, name, email, type });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { email, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'This email has already been registered' });
      }
    }

    const nonMatchPassword =
      oldPassword && !(await user.checkPassword(oldPassword));
    if (nonMatchPassword) {
      return res.status(401).json({ error: 'Old password does not match' });
    }

    const { id, name, type } = await user.update(req.body);

    return res.json({ id, name, email, type, avatar_id });
  }
}

export default new UserController();
