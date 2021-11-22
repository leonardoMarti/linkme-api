import * as Yup from 'yup';

import { TRANSLATE_USER } from '../../constants/translate';

import User from '../models/User';
import File from '../models/File';
import Address from '../models/Address';
import Candidate from '../models/Candidate';

class UserController {
  async get(req, res) {
    const { userId } = req.query;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'type'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path'],
        },
        {
          model: Address,
          as: 'address',
          attributes: ['city', 'state', 'neighborhood'],
        },
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id'],
        },
      ],
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      type: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid)
      return res.status(400).json({ error: TRANSLATE_USER.validateFail });

    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist)
      return res.status(400).json({ error: TRANSLATE_USER.userAlreadyExists });

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
    if (!isValid)
      return res.status(400).json({ error: TRANSLATE_USER.validateFail });

    const { email, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res
          .status(400)
          .json({ error: TRANSLATE_USER.userAlreadyExists });
      }
    }

    const nonMatchPassword =
      oldPassword && !(await user.checkPassword(oldPassword));
    if (nonMatchPassword) {
      return res.status(401).json({ error: TRANSLATE_USER.passwordNotMatch });
    }

    const { id, name, type } = await user.update(req.body);

    return res.json({ id, name, email, type, avatar_id });
  }
}

export default new UserController();
