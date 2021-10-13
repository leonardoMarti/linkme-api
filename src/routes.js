import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { ROUTES } from './constants/routes';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AddressController from './app/controllers/AddressController';
import FileController from './app/controllers/FileController';
import CandidateController from './app/controllers/CandidateController';
import JobController from './app/controllers/JobController';
import CandidateJobController from './app/controllers/CandidateJobController';
import AvailabilityController from './app/controllers/AvailabilityController';
import CandidateAvailabilityController from './app/controllers/CandidateAvailabilityController';
import CourseTimeController from './app/controllers/CourseTimeController';
import CandidateCourseTimeController from './app/controllers/CandidateCourseTimeController';
import PersonalityController from './app/controllers/PersonalityController';
import CandidatePersonalityController from './app/controllers/CandidatePersonalityController';
import SkillController from './app/controllers/SkillController';
import CandidateSkillController from './app/controllers/CandidateSkillController';
import IdiomController from './app/controllers/IdiomController';
import CandidateIdiomController from './app/controllers/CandidateIdiomController';
import VacancyController from './app/controllers/VacancyController';
import VacancyPersonalityController from './app/controllers/VacancyPersonalityController';
import VacancySkillController from './app/controllers/VacancySkillController';
import VacancyIdiomController from './app/controllers/VacancyIdiomController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post(ROUTES.USERS, UserController.store);
routes.get(ROUTES.USERS, UserController.get);

routes.post(ROUTES.SESSIONS, SessionController.store);

routes.use(authMiddleware);

routes.put(ROUTES.USERS, UserController.update);

routes.post(ROUTES.CANDIDATES, CandidateController.store);
routes.get(ROUTES.CANDIDATES, CandidateController.get);

routes.post(ROUTES.ADDRESS, AddressController.store);
routes.put(ROUTES.ADDRESS, AddressController.update);

routes.post(ROUTES.FILES, upload.single('file'), FileController.store);

routes.get(ROUTES.JOBS, JobController.get);
routes.post(ROUTES.JOBS, JobController.store);

routes.get(ROUTES.CANDIDATEJOBS, CandidateJobController.get);
routes.post(ROUTES.CANDIDATEJOBS, CandidateJobController.store);

routes.get(ROUTES.AVAILABILITIES, AvailabilityController.get);
routes.post(ROUTES.AVAILABILITIES, AvailabilityController.store);

routes.get(ROUTES.CANDIDATEAVAILABILITIES, CandidateAvailabilityController.get);
routes.post(
  ROUTES.CANDIDATEAVAILABILITIES,
  CandidateAvailabilityController.store
);

routes.get(ROUTES.COURSETIME, CourseTimeController.get);
routes.post(ROUTES.COURSETIME, CourseTimeController.store);

routes.get(ROUTES.CANDIDATECOURSETIME, CandidateCourseTimeController.get);
routes.post(ROUTES.CANDIDATECOURSETIME, CandidateCourseTimeController.store);

routes.get(ROUTES.PERSONALITIES, PersonalityController.get);
routes.post(ROUTES.PERSONALITIES, PersonalityController.store);

routes.get(ROUTES.CANDIDATEPERSONALITIES, CandidatePersonalityController.get);
routes.post(
  ROUTES.CANDIDATEPERSONALITIES,
  CandidatePersonalityController.store
);

routes.get(ROUTES.SKILLS, SkillController.get);
routes.post(ROUTES.SKILLS, SkillController.store);

routes.get(ROUTES.CANDIDATESKILLS, CandidateSkillController.get);
routes.post(ROUTES.CANDIDATESKILLS, CandidateSkillController.store);

routes.get(ROUTES.IDIOMS, IdiomController.get);
routes.post(ROUTES.IDIOMS, IdiomController.store);

routes.get(ROUTES.CANDIDATEIDIOMS, CandidateIdiomController.get);
routes.post(ROUTES.CANDIDATEIDIOMS, CandidateIdiomController.store);

routes.get(ROUTES.VACANCIES, VacancyController.get);
routes.post(ROUTES.VACANCIES, VacancyController.store);

routes.get(ROUTES.VACANCYPERSONALITIES, VacancyPersonalityController.get);
routes.post(ROUTES.VACANCYPERSONALITIES, VacancyPersonalityController.store);

routes.get(ROUTES.VACANCYSKILLS, VacancySkillController.get);
routes.post(ROUTES.VACANCYSKILLS, VacancySkillController.store);

routes.get(ROUTES.VACANCYIDIOMS, VacancyIdiomController.get);
routes.post(ROUTES.VACANCYIDIOMS, VacancyIdiomController.store);

export default routes;
