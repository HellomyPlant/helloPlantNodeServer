import mongoose from 'mongoose';

// url should be in .env file
mongoose.connect(
        'mongodb+srv://qwerq123456:rudghks123@cluster0.nyhkg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    );

const db = mongoose.connection;

const handleOpen = () => console.log('Connected to DB');
const handleError = (error : any) => console.log(`Error on DB Connection: ${error}`);

db.once('open', handleOpen);
db.on('error', handleError);

export * from './models';
