import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import MyPlant from "../db/models/myplant";

// export const addMyPlant = async (req: Request, res: Response) => {
//     try {
//        const myPlant = await MyPlant.create({
//            image: req.body.image,
//            nickname: req.body.nickname,
//            scientific_name : req.body.scientific_name,
//            water_cycle: req.body.water_cycle,
//            fertlizer_cycle: req.body.fertlizer_cycle
//        });
//        // const user = User.findOne();
//        // user.myPlantList.push(myPlant.id);
//     }
// }
