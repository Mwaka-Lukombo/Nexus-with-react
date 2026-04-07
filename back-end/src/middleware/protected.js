import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { config } from 'dotenv';


config();




export const protectedRoute = async(req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(403).json({message:"Unauthorized - Unauthorized"});
    }

    const decoded = jwt.verify(token,process.env.SECRET);

    if(!decoded){
        return res.status(403).json({message:"Unauthorized - invalid token!"});
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({message:"User not found!"});
    }else{
        req.user = user;
        next();
    }


}


export const isAdmin = async(req,res,next)=>{
    const currentUser = req.user.email;
     const adminEmail = process.env.adminEmail;


     if(currentUser !== adminEmail){
        return res.status(403).json({message:"Unauthorized - Your dont have premition"});
     }
     next();
}

export const isTeacher = async(req,res,next)=>{
    const {typeUser} = req.user;

    if(typeUser !== "teacher"){
        return res.status(403).json({message:"Unauthorized - your dont have permition to access this!"})
    }
    
    next();
}


export const isOldStudent = async(req,res,next)=>{
    const {typeUser} = req.user 

    if(typeUser !== "old student"){
        return res.status(403).json({message:"Unauthorized - your dont have permition"});
    }
    next();
}
