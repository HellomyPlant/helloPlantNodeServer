import { Request, Response } from 'express';
import {UserModel} from "../db";
import {myPlantModel} from "../db";

export const addMyPlant = async (req:Request, res: Response) => {
    try{
        const myPlant = await new myPlantModel({
            scientific_name : req.body.scientific_name,
            water_cycle: req.body.water_cycle,
            fertilizer_cycle: req.body.fertilizer_cycle,
            nickname: req.body.nickname,
            image: req.body.image,
            light: req.body.light
        });
        myPlant.save();
        const user = await UserModel.findOneAndUpdate(
            {email : req.query.email},
            { $addToSet: { myPlantList: myPlant  } },
            {new : true}
        );
        return res.status(201).json({
            newPlant : myPlant
        });
    }
    catch (e) {
        console.log("error : " + e);
        return res.status(400).json({errormessage : `${e}`});
    }
}

export const deleteMyPlant = async (req:Request, res: Response) => {
    try{
        const myPlant = await myPlantModel.findOneAndDelete({_id:req.body.plantId});
        if(!myPlant){
            return res.status(400).json({
                message: `no plant`
            })
        }
        const user = await UserModel.findOneAndUpdate(
            {email : req.body.email},
            { $pull: { myPlantList : req.body.plantId}
            },
            {new: true}
        )
        return res.status(204).send();
    }
    catch (e) {
        console.log("error : " + e);
        return res.status(403).json({errormessage : `${e}`});
    }
}

export const editMyPlant = async (req: Request, res: Response) => {
    try{
        const myPlant = await myPlantModel.findOneAndUpdate(
            {_id:req.body.plantId},
            req.body,
            {new: true}
            );
        if(!myPlant){
            return res.status(400).json({
                message: `no plant`
            })
        }
        return res.status(200).json({
            message: "plant data edited",
            myPlant : myPlant,
        })
    }
    catch (e) {
        return res.status(403).json({errormessage: `${e}`});
    }
}

export const myPlantList = async (req: Request, res: Response) => {
    try{
         const user = await UserModel.findOne({email: req.query.email}).lean();
         let plantList = new Array();
         let plantData = {
             scientific_name : "",
             water_cycle : "",
             fertilizer_cycle : "",
             nickname: "",
             image : "",
             light: "",
         }
         if(!user) {
             return res.status(400).json(
                 {message : "no user"}
             )
         }
         for (const plantId of user.myPlantList) {
             const myPlant = await myPlantModel.findOne({_id : plantId}).lean();
             if(myPlant){
                 plantData.scientific_name = myPlant.scientific_name;
                 plantData.water_cycle = myPlant.water_cycle;
                 plantData.fertilizer_cycle = myPlant.fertilizer_cycle;
                 plantData.nickname = myPlant.nickname;
                 plantData.image = myPlant.image;
                 plantData.light = myPlant.light;
                 console.log( `plantData : ${plantData}`);
                 plantList.push({myPlant});
             }
         }
         console.log(`my plant list : ${plantList}`);
         return res.status(200).json(
             {plants: plantList}
         )
    }
    catch (e) {
        console.log(e)
        return res.status(403).json({errormessage : `${e}`});
    }
}
