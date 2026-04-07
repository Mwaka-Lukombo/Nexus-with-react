import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import {generateToken} from '../lib/generateToken.js';
import mongoose from "mongoose";
import cloudinary from '../lib/cloudinary.js';



export const sign = async(req,res)=>{
   const {fullname,email,password} = req.body;

     let type;
     const {typeUser} = req.body;

     if(typeUser){
        type = typeUser;
     }

    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All fields are required!"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"Your password must be 6 characteres!"})
        }

        //crypting password
        const genSalt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password,genSalt);

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"User already exists!"});
        }


        const newUser = new User({
            fullname,
            email,
            password:passwordHash,
            typeUser:type
        })

        await newUser.save();

        if(newUser){
            //generateToken
            generateToken(newUser._id,res);
            
            res.status(201).json(newUser);
        }else{
            res.status(400).json({message:"Something went Wrong"})
        }
    } catch (error) {
        console.log("Error in sinupController ",error);
        res.status(500).json({message:"Internal Server Error!"})
    }

}


export const login = async(req,res)=>{
  const {email,password} = req.body;

  try {
    
    if(!email || !password){
        return res.status(400).json({message:"All fields are required!"});
    }

    //foundUser
    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({message:"User not found!"});
    }

    //compare password
    const validPassword = await bcrypt.compare(password,user.password);

    if(validPassword){
        //generateToken
        generateToken(user._id,res);

        res.status(200).json(user);
    }else{
        res.status(400).json({message:"Invalid creadentials!"});
    }

  } catch (error) {
     console.log("Error in loginController: ",error.message);
     res.status(500).json({message:"Internal Server Error!"});
  }
}


export const logout = async(req,res)=>{
    res.cookie("jwt","",{maxAge:0});

    res.status(200).json({message:"Logout successfully!"});
}

export const me = async(req,res)=>{

    try{
       res.status(200).json(req.user);
    }catch(error){
        console.log("Error in fetching mySelf", error.message);
        res.status(500).json({message:"Internal Server Error!"});
    }
}


export const profile = async (req,res)=>{
    const {course,year,profileImage} = req.body;
      const {_id} = req.user;

     try {
        
        if(!mongoose.isValidObjectId(_id)){
            return res.status(400).json({message:"Put valid objectId"});
        }

        if(!year){
            return res.status(400).json({message:"Put the year"})
        }

        const user = await User.findById(_id);


        
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }

        user.course = course || user.course;
        user.year = year;

         if (profileImage && profileImage !== user.profileImg) {
           const uploaded = await cloudinary.uploader.upload(profileImage);
           user.profileImg = uploaded.secure_url;
        }

        await user.save();

       res.status(200).json(user);

     } catch (error) {
        console.log("Error inUpdateController ",error.message);
        res.status(500).json({message:"Internal Server Error!"});
     }
}

