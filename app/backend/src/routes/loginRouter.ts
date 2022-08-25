import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const loginRouter = Router();

const service = new UserService();
const controller = new UserController(service);

loginRouter.post('/', async (req, res) => { await controller.signin(req, res); });

loginRouter.get('/validate', UserController.authenticate);

export default loginRouter;
