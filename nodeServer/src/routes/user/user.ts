import express from 'express';
import * as userControllers from '../../controllers/user';
import { authLocal, authJwt } from '../../middlewares/auth';
const router = express.Router();
router.post('/signup', userControllers.signUp);
router.post('/login', authLocal, userControllers.login);
router.get('/test',authJwt,userControllers.testJWT);
export default router;
