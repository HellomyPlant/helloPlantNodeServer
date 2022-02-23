import express from "express";
import * as plantController from '../../controllers/plant'
import {authJwt} from "../../middlewares/auth";
const router = express.Router();

router.get('/',authJwt, plantController.searchPlant);


export default router;
