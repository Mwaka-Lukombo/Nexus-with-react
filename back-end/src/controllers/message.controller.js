
import mongoose from 'mongoose';
import Message from '../models/message.model.js';
import Notification from '../models/notification.model.js';
import cloudinary from '../lib/cloudinary.js';
import { io } from '../lib/socket.io.js';




export const createMessage = async(req,res)=>{

    const {_id:userFrom} = req.user 
     const {id:userTo} = req.params
       let {text,img,link} = req.body;

       let uploader = "";


       if(img){
         const uploadFile = await cloudinary.uploader.upload(img);
         uploader = await uploadFile.secure_url;
       }
       

    try {

        if(!mongoose.isValidObjectId(userTo || userFrom)){
            return res.status(400).json({message:"Put valid object id!"});
         }

         if(userFrom.toString() === userTo.toString()){
            return res.status(400).json({message:"Your dont do send message to yourself"})
         }

        

         const newMessage = new Message({
            from:userFrom,
            to:userTo,
            text,
            img:uploader,
            link
         })

         await newMessage.save();
         await Notification.insertOne({
            from:userFrom,
            to:userTo,
            title:"Message",
            text,
            typeNotification:"message"}
        );

         //realTimeApp
         if(!req.user && !userTo) return;
         io.to(userTo).emit("newMessage",newMessage);
         
         res.status(201).json(newMessage);

        
    } catch (error) {
        console.log("Error in createMessageController ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}


export const getMessages = async(req,res)=>{
    const {_id:userFrom} = req.user 
     const {id:userTo} = req.params

     try {

        if(!mongoose.isValidObjectId(userFrom) || !mongoose.isValidObjectId(userTo)){
            return res.status(400).json({message:"put valids objects Id"});
        }

        const messages = await Message.find({
            $or:[
                {from:userFrom,to:userTo},
                {from:userTo,to:userFrom}
            ]
        });

        if(messages.length === 0){
            return res.status(400).json({message:"Dont have conversations"})
        }

        res.status(200).json(messages);
        
     } catch (error) {
        console.log("Error in getMessagesController ",error.message);
        res.status(500).json({message:"Internal Server Error"});
     }
}



export const deleteMessage = async(req,res)=>{
    const {id} = req.params

    try{
      
       const message =  await Message.findByIdAndDelete(id);

        if(!message){
            return res.status(404).json({message:"Message not found!"});
        }
        
        res.status(200).json({message:"Message deleted successfully!"});
    }catch(error){
        console.log("Error in deleteMessageController ",error.message);
        res.status(500).json({message:"Internal Server Error!"});
    }
}



