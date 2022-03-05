import mongoose, {Document, Schema} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export type InfoPlant = {
    image: string;
    email: string[];
    scientific_name: string;
    family_name: string;
    korean_name: string;
    water_cycle: string;
    height: string;
    place: string;
    smell: string;
    growth_speed: string;
    proper_temperature: string;
    pest: string;
    manage_level: string;
    light: string;
    necessary: string[];
}
export const infoPlantSchema = new Schema(
    {
        email: {
            type: [String],
            required: [true, 'email is required!']
        },
        image: {
            type: String,
            required: [true, 'image is required!']
        },
        scientific_name: {
            type: String,
            unique: true,
            required: [true, 'scientific name is required!']
        },
        family_name: {
            type: String,
        },
        korean_name: {
            type: String,
        },
        water_cycle: {
            type: String,
        },
        height:{
            type: String,
        },
        place: {
            type: String,
        },
        smell: {
            type: String,
        },
        growth_speed: {
            type: String,
        },
        proper_temperature: {
            type: String,
        },
        pest:{
            type: String,
        },
        manage_level: {
            type: String,
        },
        light: {
            type: String,
        },
        necessary: {
            type: [String],
            required: true,
        },
    },
    {timestamps: {updatedAt: 'updated_at'}}
);

infoPlantSchema.plugin(mongooseUniqueValidator, {
    message: '{VALUE} already taken',
})

interface InfoPlantBaseDocument extends InfoPlant,Document{}

export interface InfoPlantDocument extends InfoPlantBaseDocument {}

export const infoPlantModel = mongoose.model<InfoPlantDocument>('InfoPlant', infoPlantSchema);