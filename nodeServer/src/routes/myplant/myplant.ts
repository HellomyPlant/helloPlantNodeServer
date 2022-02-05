import express from "express";
import * as myPlantController from '../../controllers/myplant'
import {authJwt} from "../../middlewares/auth";
const router = express.Router();

router.post('/',authJwt, myPlantController.addMyPlant);
router.delete('/',authJwt,myPlantController.deleteMyPlant);
router.put('/',authJwt,myPlantController.editMyPlant);
router.get('/list', authJwt, myPlantController.myPlantList);

export default router;
