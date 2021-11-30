import * as Yup from 'yup';

import { TRANSLATE_USER } from '../../constants/translate';

import User from '../models/User';
import File from '../models/File';
import Address from '../models/Address';

import Candidate from '../models/Candidate';
import CandidateJob from '../models/CandidateJob';
import Job from '../models/Job';
import CandidateAvailability from '../models/CandidateAvailability';
import Availability from '../models/Availability';
import CandidateCourseTime from '../models/CandidateCourseTime';
import CourseTime from '../models/CourseTime';
import CandidatePersonality from '../models/CandidatePersonality';
import Personality from '../models/Personality';
import CandidateSkill from '../models/CandidateSkill';
import Skill from '../models/Skill';
import CandidateIdiom from '../models/CandidateIdiom';
import Idiom from '../models/Idiom';

import Vacancy from '../models/Vacancy';
import VacancyPersonality from '../models/VacancyPersonality';
import VacancySkill from '../models/VacancySkill';
import VacancyIdiom from '../models/VacancyIdiom';

import Sequelize from 'sequelize';

class UserController {
  async get(req, res) {
    const {
      id,
      limit,
      courseTime,
      offset,
      traineeName,
      type,
      skill,
      job,
      jobLevel,
      state,
      availability,
      companyName,
      vacancyTitle,
      vancacyLevel,
    } = req.query;

    const Op = Sequelize.Op;

    let userQuery = null;
    let skillQuery = null;
    let jobQuery = null;
    let addressQuery = null;
    let avaibilityQuery = null;
    let courseTimeQuery = null;

    let vacancyQuery = null;

    if (id) {
      userQuery = {
        ...userQuery,
        id,
      };
    }

    if (type) {
      userQuery = {
        ...userQuery,
        type,
      };
    }

    if (traineeName) {
      userQuery = {
        ...userQuery,
        name: { [Op.like]: `%${traineeName}%` },
      };
    }

    if (job) {
      jobQuery = {
        ...jobQuery,
        job_id: job,
      };
    }

    if (jobLevel) {
      jobQuery = {
        ...jobQuery,
        level: jobLevel,
      };
    }

    if (state) {
      addressQuery = {
        ...addressQuery,
        state,
      };
    }

    if (availability) {
      avaibilityQuery = {
        ...avaibilityQuery,
        availability_id: availability,
      };
    }

    if (courseTime) {
      courseTimeQuery = {
        ...courseTimeQuery,
        course_time_id: courseTime,
      };
    }

    if (skill) {
      skillQuery = {
        ...skillQuery,
        skill_id: skill,
      };
    }

    if (companyName) {
      userQuery = {
        ...userQuery,
        name: { [Op.like]: `%${companyName}%` },
      };
    }

    if (vacancyTitle) {
      vacancyQuery = {
        ...vacancyQuery,
        title: { [Op.like]: `%${vacancyTitle}%` },
      };
    }

    if (vancacyLevel) {
      vacancyQuery = {
        ...vacancyQuery,
        level: vancacyLevel,
      };
    }

    const user = await User.findAll({
      where: userQuery,
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
          where: addressQuery,
          attributes: ['city', 'state', 'neighborhood'],
        },
        {
          model: Candidate,
          as: 'candidate',
          attributes: ['id'],
          include: [
            {
              model: CandidateJob,
              as: 'job',
              where: jobQuery,
              attributes: ['level'],
              include: [
                {
                  model: Job,
                  as: 'job',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: CandidateAvailability,
              as: 'availability',
              where: avaibilityQuery,
              attributes: ['id'],
              order: [['id', 'ASC']],
              include: [
                {
                  model: Availability,
                  as: 'availability',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: CandidateCourseTime,
              as: 'courseTime',
              where: courseTimeQuery,
              attributes: ['id'],
              include: [
                {
                  model: CourseTime,
                  as: 'courseTime',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: CandidatePersonality,
              as: 'personality',
              attributes: ['id'],
              include: [
                {
                  model: Personality,
                  as: 'personality',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: CandidateSkill,
              as: 'skill',
              where: skillQuery,
              attributes: ['id', 'level'],
              include: [
                {
                  model: Skill,
                  as: 'skill',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: CandidateIdiom,
              as: 'idiom',
              attributes: ['id', 'level'],
              include: [
                { model: Idiom, as: 'idiom', attributes: ['id', 'name'] },
              ],
            },
          ],
        },
        {
          model: Vacancy,
          as: 'vacancy',
          where: vacancyQuery,
          attributes: [
            'id',
            'title',
            'description',
            'salary',
            'quantity',
            'level',
          ],
          include: [
            {
              model: VacancyPersonality,
              as: 'vacancyPersonality',
              attributes: ['id'],
              include: [
                {
                  model: Personality,
                  as: 'personality',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: VacancySkill,
              as: 'vacancySkill',
              attributes: ['id', 'level'],
              include: [
                {
                  model: Skill,
                  as: 'skill',
                  attributes: ['id', 'name'],
                },
              ],
            },
            {
              model: VacancyIdiom,
              as: 'vacancyIdiom',
              attributes: ['id', 'level'],
              include: [
                {
                  model: Idiom,
                  as: 'idiom',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        },
      ],
      order: [['name', 'ASC']],
      limit,
      offset,
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
