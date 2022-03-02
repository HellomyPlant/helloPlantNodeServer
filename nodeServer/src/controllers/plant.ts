import { Request, Response } from 'express';
import {plantModel} from "../db";


export const searchPlant = async (req:Request, res: Response) => {
    try{
        var scientific_name = req.query.scientific_name as string;
        var re = new RegExp(scientific_name,"i")
    
        console.log(scientific_name);
        const plant = await plantModel.findOne({scientific_name : {$regex : scientific_name}});
        if(!plant){
            return res.status(400).json({
                message: `There is no plant with the scientific name ${req.query.scientific_name}`
            });
        }
        return res.status(200).json({
            plant : plant
        });
    }
    catch (e) {
        return res.status(403).json({
            errormessage: `${e}`
        });
    }
}
