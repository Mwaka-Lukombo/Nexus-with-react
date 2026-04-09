import mongoose from "mongoose";
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js";




export const getNotify = async(req,res)=>{
 const {_id:userId} = req.user;

 try {
    
    if(!mongoose.isValidObjectId(userId)) return res.status(400).json({message:"Something went wrong!"});


    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({message:"User not found!"});
    }

    const myNotifications = await Notification.find({to:user._id},{read:false}).populate({
        path:"from",
        select:"fullname email profileImg typeUser"
    }).sort({createdAt:-1});

    res.status(200).json(myNotifications);
 } catch (error) {
    console.log("Error inGetNotificationController ",error.message);
    res.status(500).json({message:"Internal Server Error"});
 }
}




export const readNotify = async(req,res)=>{

    const {_id:userId} = req.user;

    try {
        
        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).json({message:"Invalid ObjectId"});
        }

        const notification = await Notification.find({to:userId});

        if(!notification){
            return res.status(404).json({message:"Notifications not found!"});
        }

        const result = await Notification.updateMany(
            { to: userId, read: false },
            { $set: { read: true } }
            );
        
    

        res.status(200).json(result);

    } catch (error) {
         console.log("Error inReadNotificationController ",error.message);
         res.status(500).json({message:"Internal Server Error"})
    }

}


export const deleteNotifications = async(req,res)=>{
    const {_id:userId} = req.user;

    try {
        if(!mongoose.isValidObjectId(userId)){
            return res.status(400).json({message:"Put valid ObjectId"});
        }

        const user = await User.findById(userId);

        if(!user) return res.status(404).json({message:'User not found!'});

         await Notification.deleteMany(
            {to:userId}
         )


         res.status(200).json({message:"Notifications deleted successfully!"});
        
    } catch (error) {
        console.log("Error inDeleteNotificationController ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

