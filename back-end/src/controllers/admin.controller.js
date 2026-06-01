import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';




export const getAllUsers = async(req,res)=>{
   const {page, limit} = req.query;
   try {

      const currentPage = Number(page);
      const limitPages = Number(limit);

      const total = await User.countDocuments();

      const skip = (currentPage - 1) * limit;
       const totalPages = Math.ceil((total / limit));
      
      const users = await User.find({email:{$ne:"alphonse@gmail.com"}})
      
      .sort({createdAt:-1})
      ; 

      if(!users) return res.status(404).json({message:"Users not found!"});

      res.status(200).json({
         users,
         totalPages,
         currentPage
      });
   } catch (error) {
      console.log("ErrorInGetAllUsersController ",error.message);
      res.status(500).json({message:"Internal Server Error"});
   }
}



export const createUser = async(req,res)=>{
   const {fullname, email, password, typeUser} = req.body;
   try {
      
      if(!fullname || !email || !password || !typeUser){
         return res.status(400).json({message:"All fields are required"})
      }

      const user = await User.findOne({email});

      if(user){
         return res.status(400).json({message:"User already exists!"});
      }

      //crypting password
      const salt = await bcrypt.genSalt(12);
       const hashPassword = await bcrypt.hash(password,salt);

      const newUser = new User({
         fullname,
         email,
         password:hashPassword,
         typeUser
      })
      
      await newUser.save();

      res.status(201).json(newUser);
   } catch (error) {
      console.log("ErrorInCreateController ",error.message);
      res.status(500).json({message:"Internal Server Error"});
   }
}


export const deleteUser = async(req,res)=>{
   const {id} = req.params;

   try {
       if(!mongoose.isValidObjectId(id)){
         return res.status(400).json({message:"Internal Server Error"});
       } 
       
       const user = await User.findByIdAndDelete(id);

       if(!user){
         return res.status(200).json({message:"User not found!"});
       }

       res.status(200).json({message:"User deleted successfully"})
   } catch (error) {
      console.log("ErrorInDeleteController ",error.message);
      res.status(500).json({message:"Internal Server Error"});
   }
}









