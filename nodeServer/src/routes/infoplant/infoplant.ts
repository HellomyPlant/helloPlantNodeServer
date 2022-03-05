import express from "express";
import * as infoPlantController from '../../controllers/infoplant'
import {authJwt} from "../../middlewares/auth";
const router = express.Router();

router.post('/',authJwt, infoPlantController.addInfoPlant);
router.put('/',authJwt, infoPlantController.editInfoPlant);
router.delete('/',authJwt, infoPlantController.deleteInfoPlant);
router.get('/list',authJwt, infoPlantController.infoPlantList);
router.put('/mail', authJwt, infoPlantController.addMailToInfoPlant);
export default router;
