import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { ROUTES } from './constants/routes';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AddressController from './app/controllers/AddressController';
import FileController from './app/controllers/FileController';
import CandidateController from './app/controllers/CandidateController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post(ROUTES.USERS, UserController.store);
routes.get(ROUTES.USERS, UserController.get);

routes.post(ROUTES.SESSIONS, SessionController.store);

routes.use(authMiddleware);

routes.put(ROUTES.USERS, UserController.update);

routes.post(ROUTES.CANDADIDATES, CandidateController.store);
routes.get(ROUTES.CANDADIDATES, CandidateController.get);

routes.post(ROUTES.ADDRESS, AddressController.store);
routes.put(ROUTES.ADDRESS, AddressController.update);

routes.post(ROUTES.FILES, upload.single('file'), FileController.store);

export default routes;
