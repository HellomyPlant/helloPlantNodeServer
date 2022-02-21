import mongoose, { Document, Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export type Plant = {
    scientific_name: string;
    family_name: string;
    water_cycle: string;
    height: string;
    place: string;
    smell: string;
    growth_speed: string;
    proper_temperature: string;
    pest: string;
    manage_level: string;
    light: string;
}

export const plantSchema = new Schema(
    {
        scientific_name: {
            type: String,
            unique: true,
        },
        family_name: {
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
    },
    {timestamps: true,}
);

plantSchema.plugin(mongooseUniqueValidator, {
    message: '{VALUE} already taken',
});

interface PlantBaseDocument extends Plant,Document{}

export interface PlantDocument extends PlantBaseDocument {}

export const plantModel = mongoose.model<PlantDocument>('Plant', plantSchema);
