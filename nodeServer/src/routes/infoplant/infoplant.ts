import express from "express";
import * as infoPlantController from '../../controllers/infoplant'
import {authJwt} from "../../middlewares/auth";
import {infoPlantList} from "../../controllers/infoplant";
const router = express.Router();

router.post('/',authJwt, infoPlantController.addInfoPlant);
router.put('/',authJwt, infoPlantController.editInfoPlant);
router.get('/list',authJwt, infoPlantController.infoPlantList);
export default router;
