import express from "express";
import userRoutes from './user/user';
import myPlantRoutes from './myplant/myplant';
const router = express.Router();

router.get('/test', (req,res)=>{
   res.sendStatus(200);
});
router.use('/user', userRoutes);
router.use('/myplant', myPlantRoutes);
export default router;