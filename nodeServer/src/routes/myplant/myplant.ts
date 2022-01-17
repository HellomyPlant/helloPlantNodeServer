import express from "express";
import * as myPlantController from '../../controllers/myplant'
import {authJwt, authLocal} from "../../middlewares/auth";
import * as plantControllers from "../../controllers/myplant";
const router = express.Router();
// router.post('/',authJwt, plantControllers.signUp);
// router.get('/', authJwt, plantControllers.login);
// router.delete('/',authJwt,plantControllers.testJWT);
// router.put('/',authJwt,plantControllers.signUp);
// router.get('/list', authJwt, plantControllers.login);

export default router;
