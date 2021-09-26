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

export default routes;
