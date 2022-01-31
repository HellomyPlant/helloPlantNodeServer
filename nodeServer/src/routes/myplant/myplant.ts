import express from "express";
import * as myPlantController from '../../controllers/myplant'
import {authJwt, authLocal} from "../../middlewares/auth";
import * as plantControllers from "../../controllers/myplant";
const router = express.Router();
router.post('/',authJwt, plantControllers.addMyPlant);
// router.get('/', authJwt, plantControllers.login);
router.delete('/',authJwt,plantControllers.deleteMyPlant);
router.put('/',authJwt,plantControllers.editMyPlant);
router.get('/list', authJwt, plantControllers.myPlantList);

export default router;
