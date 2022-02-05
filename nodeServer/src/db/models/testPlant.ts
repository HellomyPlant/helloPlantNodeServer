import mongoose, {Schema} from 'mongoose';

export type TestPlant = {
    testId : string;
    korean_name: string;
    scientific_name: string;
    possibility: string;
    local_name: string;
}
export const testPlantSchema = new Schema(
    {
        testId: {
            type: String,
            required: [true, 'testId is required!'],
            unique: true,
        },
        korean_name:{
            type: String,
            required: [true, 'korean_name is required!'],
        },
        possibility: {
            type: String,
            required: [true, 'possibility is required!'],
        },
        scientific_name: {
            type: String,
            required: [true, 'scientific name is required!'],
        },
        local_name: {
            type: String,
        },
    },
    {timestamps: true,}
);

interface TestPlantBaseDocument extends TestPlant,Document{}

export interface TestPlantDocument extends TestPlantBaseDocument {}

export const testPlantModel = mongoose.model<TestPlantDocument>('TestPlant', testPlantSchema);