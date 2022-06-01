import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
    "mongodb://my-username:my-root-password@mongo:27017"
    // process.env.DB_URL as string,
    // "mongodb+srv://qwerq123456:rudghks123@cluster0.nyhkg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
const db = mongoose.connection;

const handleOpen = () => console.log(`Connected to DB`);
const handleError = (error : any) => console.log(`Error on DB Connection: ${error}`);

db.once('open', handleOpen);
db.on('error', handleError);

export * from './models';