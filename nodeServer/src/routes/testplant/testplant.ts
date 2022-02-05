import express from "express";
import * as testPlantController from "../../controllers/testplant";
import {authJwt} from "../../middlewares/auth";
const router = express.Router();

router.post('/', testPlantController.addTestPlant);
router.delete('/',testPlantController.deleteTestPlant);
router.get('/list',testPlantController.testPlantList);

export default router;
