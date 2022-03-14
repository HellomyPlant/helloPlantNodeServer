import { Request, Response } from 'express';
import {infoPlantModel} from "../db";
import {plantModel} from "../db";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const addInfoPlant = async (req:Request, res: Response) => {
    try{
        const plant = await plantModel.findOne({scientific_name : req.body.scientific_name});
        if(plant){
            return res.status(405).json({
                message: `already plant data exists`,
                plant: plant
            })
        }
        const infoplant = await infoPlantModel.findOne({scientific_name: req.body.scientific_name});

        const default_necessary: string[] = ["family_name", "korean_name", "water_cycle", "height", "place", "smell", "growth_speed","proper_temperature", "pest", "manage_level", "light"];
        const not_necessary: string[] = [];
        let data: any = {}
        if(!req.body.email){
            return res.status(403).json({
                errormessage : `email has to be sended`
            })
        }
        data.email = [req.body.email];
        data.scientific_name = req.body.scientific_name;
        if(req.body.family_name!=undefined) {
            data.family_name = req.body.family_name;
            not_necessary.push("family_name");
        }
        if(req.body.korean_name!=undefined) {
            data.korean_name = req.body.korean_name;
            not_necessary.push("korean_name");
        }
        if(req.body.water_cycle !== undefined) {
            data.water_cycle = req.body.water_cycle;
            not_necessary.push("water_cycle");
        }
        if(req.body.height !== undefined) {
            data.height = req.body.height;
            not_necessary.push("height");
        }
        if(req.body.place !== undefined) {
            data.place = req.body.place;
            not_necessary.push("place");
        }
        if(req.body.smell !== undefined) {
            data.smell = req.body.smell;
            not_necessary.push("smell");
        }
        if(req.body.growth_speed !== undefined) {
            data.growth_speed = req.body.growth_speed;
            not_necessary.push("growth_speed");
        }
        if(req.body.proper_temperature !== undefined) {
            data.proper_temperature = req.body.proper_temperature;
            not_necessary.push("proper_temperature");
        }
        if(req.body.pest !== undefined) {
            data.pest = req.body.pest;
            not_necessary.push("pest");
        }
        if(req.body.manage_level !== undefined) {
            data.manage_level = req.body.manage_level;
            not_necessary.push("manage_level");
        }
        if(req.body.light !== undefined) {
            data.light = req.body.light;
            not_necessary.push("light");
        }
        const necessary = default_necessary.filter(x => !not_necessary.includes(x));
        if(necessary.length===0){
            const newPlant = await new plantModel(data);
            await newPlant.save();
            return res.status(201).json({
                message: "plant data added!",
                plant: newPlant
            })
        }
        data.image = req.body.image;
        data.necessary = necessary;
        console.log(data);
        console.log(`necessary : \n ${necessary}`);
        const newInfoPlant = await new infoPlantModel(data);
        await newInfoPlant.save();
        return res.status(200).json({
            message: "info plant data added!",
            infoPlant : newInfoPlant
        })
    }
    catch (e) {
        console.log(`add infoplant error with ${e}`);
        return res.status(403).json({
            errormessage: `${e}`
        })
    }
}

export const editInfoPlant = async (req:Request, res: Response) => {
    try{
        let infoPlant = await infoPlantModel.findOne({scientific_name: req.body.scientific_name}).lean();
        if(!infoPlant) {
            return res.status(400).json({
                message: 'no infoPlant'
            });
        }

        let necessary = infoPlant.necessary;
        const not_necessary: string[] = [];
        if(req.body.family_name!=undefined) {
            infoPlant.family_name = req.body.family_name;
            not_necessary.push("family_name");
        }
        if(req.body.korean_name!=undefined) {
            infoPlant.korean_name = req.body.korean_name;
            not_necessary.push("korean_name");
        }
        if(req.body.water_cycle !== undefined) {
            infoPlant.water_cycle = req.body.water_cycle;
            not_necessary.push("water_cycle");
        }
        if(req.body.height !== undefined) {
            infoPlant.height = req.body.height;
            not_necessary.push("height");
        }
        if(req.body.place !== undefined) {
            infoPlant.place = req.body.place;
            not_necessary.push("place");
        }
        if(req.body.smell !== undefined) {
            infoPlant.smell = req.body.smell;
            not_necessary.push("smell");
        }
        if(req.body.growth_speed !== undefined) {
            infoPlant.growth_speed = req.body.growth_speed;
            not_necessary.push("growth_speed");
        }
        if(req.body.proper_temperature !== undefined) {
            infoPlant.proper_temperature = req.body.proper_temperature;
            not_necessary.push("proper_temperature");
        }
        if(req.body.pest !== undefined) {
            infoPlant.pest = req.body.pest;
            not_necessary.push("pest");
        }
        if(req.body.manage_level !== undefined) {
            infoPlant.manage_level = req.body.manage_level;
            not_necessary.push("manage_level");
        }
        if(req.body.light !== undefined) {
            infoPlant.light = req.body.light;
            not_necessary.push("light");
        }
        const filtered = necessary.filter(x => !not_necessary.includes(x));
        infoPlant.necessary = filtered;
        if(filtered.length===0){
            const newPlant = await new plantModel(infoPlant);
            await newPlant.save();
            for(const mail of infoPlant.email){
                sendMail(mail,infoPlant.scientific_name).catch(console.error);
            }
            await infoPlantModel.findOneAndDelete({scientific_name:req.body.scientific_name});
            return res.status(201).json({
                message: "plant data added and infoPlant deleted!",
                plant: newPlant
            });
        }
        else{
            const editedPlant = await infoPlantModel.findOneAndUpdate(
                {scientific_name: req.body.scientific_name},
                infoPlant,
                {new: true}
            );
            return res.status(200).json({
                message: "info plant data edited",
                infoPlant: editedPlant,
            });
        }
    }
    catch (e) {
        console.log(`edit info plant fail with error ${e}`);
        return res.status(403).json({errormessage : `edit info plant fail with error : ${e}`});
    }
}
const EMAIL = "dmsskgus@naver.com";
const EMAIL_PW = "1220skgus^^";
const sendMail = async (userMail : string,plantName: string) => {
    try{
        const plant = await plantModel.findOne({scientific_name : plantName});
        let transporter = nodemailer.createTransport({
            service: 'Naver',
            host:'smtp.naver.com',
            port: 587,
            auth: {
                user: EMAIL,
                pass: EMAIL_PW,
            },
        });
        let info = await transporter.sendMail({
            from : EMAIL,
            to: userMail,
            subject : 'HelloMyPlant에 식물 정보가 완성되었습니다',
            text:
            `안녕하세요 HelloMyPlant앱 개발팀 입니다.\n요청하신 식물 '${plantName}'의 정보가 완성되었습니다 앱에서 확인해 주세요\n ${plant}`
        });
        console.log(`mail sended with ${info}`);
    }
    catch(e) {
        console.log(`send mail error with ${e}`);
    }
}
export const deleteInfoPlant = async (req:Request, res: Response) => {
    try{
        let infoPlant = await infoPlantModel.findOneAndDelete({scientific_name: req.body.scientific_name});
        if(!infoPlant) {
            return res.status(400).json({
                message: 'no infoPlant'
            });
        }
        return res.status(204);
    }
    catch (e) {
        console.log(`delete infoplant fail with error ${e}`);
        return res.status(403).json({errormessage : `delete info plant fail with error : ${e}`});
    }
}
export const infoPlantList = async (req: Request, res: Response) => {
    try{
        const page = parseInt(<string>req.query.page);
        const infoPlant = await infoPlantModel.find({}, null, {sort:{"updated_at":-1}});
        const infoPlantList = [];
        let maxPage = 0;
        if(infoPlant){
            maxPage = Math.floor((infoPlant.length-1)/9+1);
        }
        for(let i = 0; i<9; i++){
            if(infoPlant[i+9*page-9]){
                infoPlantList.push(infoPlant[i+9*page-9]);
            }
            else{
                break;
            }
        }
        return res.status(201).json({
            message: `infoplant list for page : ${page}`,
            infoPlantList : infoPlantList,
            page : page,
            maxPage : maxPage
        });
    }
    catch(e) {
        res.status(403).json({
            message : `get infoPlantList error with ${e}`,
        })
    }
}
export const addMailToInfoPlant = async (req: Request, res: Response) => {
    try{
        const infoPlant = await infoPlantModel.findOneAndUpdate(
            {scientific_name:req.body.scientific_name},
            { $addToSet: { email: req.body.email  } },
            {new: true}
        );
        return res.status(200).json({
            message: `mail added success!`,
            infoPlant : infoPlant
        });
    }
    catch(e) {
        return res.status(403).json({
            errormessage : `mail adding fail with error : ${e}`
        });
    }
}
