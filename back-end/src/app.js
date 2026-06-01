import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {config} from 'dotenv';
import Routes from './routes/Route.js';
import { dbConnect } from './lib/db.js';
import { httpServer,app } from './lib/socket.io.js';
import path from 'path';



import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

config();

const PORT = process.env.PORT;


const __dirname = path.resolve();

app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({
    extended:true
}));



if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"front-end","dist")));

    //configure rotes
    app.get(/.*/,(req,res)=>{
        res.sendFile(path.join(__dirname,"front-end","dist"));
    })
}


app.use(cookieParser());
app.use(Routes);


dbConnect().then(()=>{
    httpServer.listen(PORT,()=>{
        console.log("App as running in: ",PORT);
    })
})





