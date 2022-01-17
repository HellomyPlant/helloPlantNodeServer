import mongoose, {Schema} from 'mongoose';

export type MyPlant = {
    image: string;
    nickname: string;
    scientific_name: string;
    water_cycle: Object;
    fertilizer_cycle: number;
}
export const myPlantSchema = new Schema(
    {
        image:{
            type: String,
            required: [true, 'plant image is required!'],
        },
        nickname: {
            type: String,
            required: [true, 'plant nickname is required!'],
        },
        scientific_name: {
            type: String,
            required: [true, 'scientific name is required!'],
        },
        water_cycle: {
            type: Object,
            required:[true, 'water cycle is required!'],
        },
        fertilizer_cycle:{
            type: String,
            required: [true, 'fertilizer cycle is required!'],
        },
    },
    {timestamps: true,}
);

interface MyPlantBaseDocument extends MyPlant,Document{}

export interface MyPlantDocument extends MyPlantBaseDocument {}

export default mongoose.model<MyPlantDocument>('MyPlant', myPlantSchema);