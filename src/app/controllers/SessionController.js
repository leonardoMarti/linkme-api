import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const isValid = await schema.isValid(req.body);
    if (!isValid) return res.status(400).json({ error: 'Validation fails' });

    const { email: emailBody, password } = req.body;

    const user = await User.findOne({
      where: { email: emailBody },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path'],
        },
      ],
    });

    if (!user) return res.status(401).json({ error: 'E-mail não existe!' });

    const nonMatchPassword = !(await user.checkPassword(password));

    if (nonMatchPassword) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    const { id, email, name, type, avatar } = user;

    return res.json({
      user: { id, email, name, type, avatar },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
