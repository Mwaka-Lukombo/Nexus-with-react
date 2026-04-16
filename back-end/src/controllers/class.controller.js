import Class from "../models/class.model.js";
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import mongoose from "mongoose";




const uploadFile = async(file,source)=>{
    const upload = await cloudinary.upload.upload(file,{
        resource_type:source
    })

    return upload.secure_url;
}


export const createClass = async(req,res)=>{
   let {
    nameClass,
    course,
    year,
    video,
    file,
    description,
    bannerClass
   } = req.body;

   const {_id:teacherId} = req.user;
   

   try {
      if(!nameClass || !course || !year || !material) return res.status(400).json({message:"Basic informations are required!"});

     const teacher = await User.findById(teacherId);
     if(!teacher) return res.status(404).json({message:"User not found!"});
    
     if(video){
        const upload = uploadFile(video,"video");
        video = upload;
     }

     if(file){
        const upload = uploadFile(file,"raw");
        file = upload;
     }

     if(bannerClass){
        const upload = uploadFile(bannerClass,"image");
        bannerClass = upload;
     }


     //create new classRoom
     const classRoom = new Class({
        nameClass,
        teacherId:teacher._id,
        course,
        year,
        material:[{
            type: video && "video" || file && "file",
            materialName: video ? video : file,
            description
        }]
     })

     await Class.save();

     res.status(201).json(classRoom);

   } catch (error) {
     console.log("ErrorInCreateClassController ",error.message);
     res.status(500).json({message:"Internal Server Error"})
   }
   
}




export const getClasses = async (req,res)=>{
    
    try {
       
        const classes = await Class.find();

        if(!classes) return res.status(404).json([]);

        res.status(200).json(classes);
       
    } catch (error) {
        console.log("ErrorInGetMyClassController ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const createActivites = async (req,res)=>{
    const {id} = req.params;
     const {
        name,
        title
     } = req.body;
     
    try {

        if(!name || !title) return res.status(400).json({message:"All fields are required"});

        const classRoom = await Class.findById(id);

        if(!classRoom) return res.status(404).json({message:"ClassRoom not found!"});
        const newActivite = {name, title}
        
        await classRoom.activites.push(newActivite);

        res.status(201).json(newActivite);
        
    } catch (error) {
        console.log("ErrorInActiviteController ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}


//Students functionalites
export const commentActivite = async(req,res)=>{
    const {_id:userId} = req.user;
     const {id} = req.params;
     const {text} = req.body;

    try {

        if(!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(id)){
            return res.status(400).json({message:"Invalid ObjectId"})
        }

        const classRoom = await Class.findOne({_id:id});

        if(!classRoom) return res.status(404).json({message:"ClassRoom not found!"});

        const newComment = {text,userId}

        await classRoom.activites[0].comment.push(newComment);

        res.status(201).json(newComment);
        
    } catch (error) {
        console.log("ErrorInPostWorkController ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}



export const commentClass = async(req,res)=>{
    const {_id:userId} = req.user;
     const {id} = req.params;
     const {text} = req.body;

    try {

        if(!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(id)){
            return res.status(400).json({message:"Invalid ObjectId"})
        }

        const classRoom = await Class.findOne({_id:id});

        if(!classRoom) return res.status(404).json({message:"ClassRoom not found!"});

        const newComment = {text:comment,userId}

        await classRoom.comments.push(newComment);

        res.status(201).json(newComment);
        
    } catch (error) {
        console.log("ErrorInPostWorkController ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}


