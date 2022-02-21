import express from "express";
import userRoutes from './user/user';
import myPlantRoutes from './myplant/myplant';
import testPlantRoutes from './testplant/testplant';
import infoPlantRoutes from './infoplant/infoplant';

const router = express.Router();

router.get('/test', (req,res)=>{
   res.sendStatus(200);
});

router.use('/user', userRoutes);
router.use('/myplant', myPlantRoutes);
router.use('/testplant', testPlantRoutes);
router.use('/infoplant', infoPlantRoutes);
export default router;