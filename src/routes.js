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

export default routes;
