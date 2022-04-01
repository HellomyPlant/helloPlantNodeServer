import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
    process.env.DB_URL as string,
);

const db = mongoose.connection;

const handleOpen = () => console.log(`Connected to DB`);
const handleError = (error : any) => console.log(`Error on DB Connection: ${error}`);

db.once('open', handleOpen);
db.on('error', handleError);

export * from './models';