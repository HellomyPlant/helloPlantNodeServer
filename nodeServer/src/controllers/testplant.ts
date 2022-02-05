import { Request, Response } from 'express';
import {UserModel} from "../db";
import {myPlantModel} from "../db";
import {testPlantModel} from "../db";

export const addTestPlant = async (req:Request, res: Response) => {
    try{
        const testPlant = await new testPlantModel({
            testId : req.body.testId,
            scientific_name : req.body.scientific_name,
            korean_name : req.body.korean_name,
            possibility : req.body.possibility,
            local_name : req.body.local_name
        })
        testPlant.save();
        return res.status(200).json({
            plant: testPlant,
        });
    }
    catch (e) {
        console.log("error : " + e);
        return res.status(400).json({errormessage : `${e}`});
    }
}

export const deleteTestPlant = async (req:Request, res: Response) => {
    try{
        const testPlant = await testPlantModel.findOneAndDelete({testId:req.body.testId});
        if(!testPlant){
            return res.status(400).json({
                message: 'no plant'
            })
        }
        return res.status(200).json({
            plant: testPlant,
        });
    }
    catch (e) {
        console.log("error : " + e);
        return res.status(403).json({errormessage : `${e}`});
    }
}

export const testPlantList = async (req:Request, res: Response) => {
    try{
        const testPlantList = await testPlantModel.find({});
        return res.status(200).json({
            testPlantList : testPlantList
        });
    }
    catch (e) {
        console.log(e);
        return res.status(403).json({errormessage : `${e}`});
    }
}