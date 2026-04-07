import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {config} from 'dotenv';
import Routes from './routes/Route.js';
import { dbConnect } from './lib/db.js';
import { httpServer,app } from './lib/socket.io.js';

config();

const PORT = process.env.PORT;


app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({
    extended:true
}));

app.use(cookieParser());
app.use(Routes);


dbConnect().then(()=>{
    httpServer.listen(PORT,()=>{
        console.log("App as running in: ",PORT);
    })
})





