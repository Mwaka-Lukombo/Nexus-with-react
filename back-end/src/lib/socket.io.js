import {createServer} from 'http';
import {Server} from 'socket.io';
import express from 'express';


const app = new express();

const httpServer = createServer(app);

const io = new Server(httpServer,({
    //options
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
}))



let onlineUsers = new Map();

io.on("connection",(socket)=>{
    console.log("Socket as connected: ",socket.id);

    const userId = socket.handshake.query.userId;


    onlineUsers.set(socket.id,userId);

    io.emit("OnlineUsers",Array.from(onlineUsers.values()));

     socket.on("disconnect",()=>{
        console.log("Socket disonnect: ",socket.id)
        onlineUsers.delete(socket.id);
        io.emit("OnlineUsers", Array.from(onlineUsers.values()));
    })
})



export {io,httpServer,app};










