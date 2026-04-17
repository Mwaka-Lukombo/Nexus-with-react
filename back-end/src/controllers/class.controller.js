import Class from "../models/class.model.js";
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import mongoose, { mongo } from "mongoose";
import Notification from '../models/notification.model.js';




const uploadFile = async (file, resourceType) => {
  const upload = await cloudinary.uploader.upload(file, {
    resource_type: resourceType,
    type: "upload", 
  });

  return upload.secure_url;
};



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
      if(!nameClass || !course || !year) return res.status(400).json({message:"Basic informations are required!"});

     const teacher = await User.findById(teacherId);
     if(!teacher) return res.status(404).json({message:"User not found!"});
    
     if(video){
        
        const upload = await uploadFile(video,"video");
        video = upload;
        
     }

     if(file){
        const upload = await uploadFile(file,"image","upload");
        file = upload;
        
     }

     if(bannerClass){
        const upload = await uploadFile(bannerClass,"image");
        bannerClass = upload;
     }
     const materials = [];


        if (video) {
        materials.push({
            type: "video",
            materialName: video,
            description
        });
        }

        if (file) {
        materials.push({
            type: "file",
            materialName: file,
            description
        });
        }

     const verifyClass = await Class.findOne({nameClass,year,course});


     if(verifyClass) return res.status(400).json({message:"Class Already exits!"});


     //create new classRoom
     const classRoom = new Class({
        nameClass,
        teacherId:teacher._id,
        course,
        year,
        bannerClass
     })


     if(classRoom){
        classRoom.material = materials;
     }

     //create notification
     

     await classRoom.save();
    //  await Notification.insertMany(newNotication);
     

     res.status(201).json(classRoom);

   } catch (error) {
     console.log("ErrorInCreateClassController ",error.message);
     res.status(500).json({message:"Internal Server Error"})
   }
   
}




export const getClasses = async (req,res)=>{
    
    try {
       
        const classes = await Class.find().populate({
            path:"teacherId",
            select:"fullname email profileImg"
        });

        if(!classes) return res.status(404).json([]);

        res.status(200).json(classes);
       
    } catch (error) {
        console.log("ErrorInGetMyClassController ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export const getClassSingle = async(req,res)=>{
    const {id} = req.params;

    
    try {
        if(!mongoose.isValidObjectId(id)) return res.status(400).json({message:"Put valid objectId"});

        const classRoom = await Class.findOne({_id:id}).populate({
            path:"teacherId",
            select:"fullname email profileImg"
        });

        if(!classRoom) return res.status(404).json({message:"ClassRoom not found!"});

        res.status(200).json(classRoom);
    } catch (error) {
        console.log("ErrorInGetSingleClassRoom ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

const getPublicId = (url) => {
  if (!url) return null;

  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];

  const folder = parts.slice(parts.indexOf("upload") + 1, -1).join("/");

  return folder ? `${folder}/${publicId}` : publicId;
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Put valid objectId" });
    }

    
    const classRoom = await Class.findById(id);

    if (!classRoom) {
      return res.status(404).json({ message: "ClassRoom not found!" });
    }

    if (classRoom.bannerClass) {
      const publicId = getPublicId(classRoom.bannerClass);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    
    if (classRoom.file) {
      if (Array.isArray(classRoom.file)) {
        for (const f of classRoom.file) {
          const publicId = getPublicId(f);
          if (publicId) {
            await cloudinary.uploader.destroy(publicId, {
              resource_type: "raw", 
            });
          }
        }
      } else {
        const publicId = getPublicId(classRoom.file);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "raw",
          });
        }
      }
    }

    
    await Class.findByIdAndDelete(id);

    res.status(200).json({ message: "ClassRoom deleted successfully!" });
  } catch (error) {
    console.log("ErrorInDeleteClass ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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



export const students = async(req,res)=>{
  try {
    const students = await User.find({typeUser:'student'});

    res.status(200).json(students);
  } catch (error) {
    console.log("ErrorInStudentController ",error.message);
      res.status(500).json({message:"Internal Server Error"});
  }
}




