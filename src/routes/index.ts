import express from "express";
import userRoutes from './user/user';

const router = express.Router();

router.get('/test', (req,res)=>{
   res.sendStatus(200);
});
router.use('/user', userRoutes);

export default router;