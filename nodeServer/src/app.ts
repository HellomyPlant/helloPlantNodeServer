import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import compression from 'compression';
import router from './routes/index';
import './db';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const app = express();

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use(session({
    // todo : put it in .env
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
}));
app.use(compression());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    if (req.method === 'OPTIONS') res.send(200);
    else next();
});
app.use(passport.initialize());

app.use('/', router);

// todo : put port in .env
app.listen('5000', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 5000!
  ################################################
`);
});