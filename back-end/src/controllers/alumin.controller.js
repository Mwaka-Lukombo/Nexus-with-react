
import { Notice } from "../models/notice.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";


async function uploadFile(file){
    const upload = await cloudinary.uploader.upload(file);

    return upload.secure_url;
}


export const getNews = async(req,res)=>{
  try {
    
    const notices = await Notice.find().populate({
      path:"userId",
      select:"fullname email profileImg"
    }).sort({createdAt:-1});

    res.status(200).json(notices);
  } catch (error) {
    console.log("Error in fetchinNoticeController ",error.message);
    res.status(500).json({message:"Internal Server Error!"})
  }
}


export const likeNotice = async(req,res)=>{
   const {_id:userId} = req.user 
     const {id} = req.params 
  
  try {

    if(!mongoose.isValidObjectId(id)){
      return res.status(400).json({message:"Put valid objectId!"});
    }


    const notice = await Notice.findById(id);
    const user = await User.findById(userId);

    if(!notice){
      return res.status(404).json({message:"Notice not found!"});
    }

    if(!user){
      return res.status(404).json({message:'User not found!'});
    }

    if(!notice.likes.includes(user._id)){
      //like notice

      await notice.likes.push(user._id);
      await notice.save();

      res.status(200).json({message:"Notice liked"});
      
    }else{
      //unlik
      await notice.likes.pull(user._id);
      await notice.save();

      res.status(200).json({message:"Notice unliked!"});
    }

    
  } catch (error) {
    console.log("Error inLikeController ",error.message);
    res.status(500).json({message:"Internal Server Error!"});
  }
}


export const comment = async(req,res)=>{
  const {_id:userId} = req.user;
   const {id} = req.params
    const {comment} = req.body
  
  try {

    if(!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(id)){
      return res.status(400).json({message:"Put valid objectId!"});
    }

    if(!comment){
      return res.status(400).json({message:"Write One Comment!"});
    }

    const user = await User.findById(userId);
    const notice = await Notice.findById(id,{comments:1});

    if(!user || !notice){
      return res.status(404).json({message:"User or not not found!"})
    }

    if(comment){
       await notice.comments.push({userId:userId,noticeId:notice._id,comment});

       await notice.save();


       res.status(200).json(notice);
    }
  
  } catch (error) {
    console.log("Error inCommentController ",error.message);
    res.status(500).json({message:"Internal Server Error!"});
  }
}


export const getComments = async(req,res)=>{
  const {id} = req.params 

  try {
    
    if(!mongoose.isValidObjectId(id)){
       return res.status(400).json({message:"Put valid objectId!"});
    }

    const comments = await Notice.findById(id,{comments:1}).populate({
      path:"comments.userId",
      select:"fullname email profileImg"
    })
    

    res.status(200).json(comments);
  } catch (error) {
    console.log("Error inGetCommentsController ",error.message);
    res.status(500).json({message:"Internal Server Error!"});
  }
}



export const getNoticeSingle = async(req,res)=>{
    const {id} = req.params
  try {
      if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message:"Put valid objectId!"})
      }  
      
      const notice = await Notice.findById(id);

      if(!notice){
         return res.status(404).json({message:"Notice not found!"});
      }

      res.status(200).json(notice)
  } catch (error) {
     console.log("Error inGetNoticeSingle ",error.message);
     res.status(500).json({message:"Internal Server Error!"});
  }
}



export const noticeStore = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;

  try {
    if (
      !mongoose.isValidObjectId(userId) ||
      !mongoose.isValidObjectId(noticeId)
    ) {
      return res.status(400).json({ message: "Put valid ObjectIds!" });
    }

    const user = await User.findById(userId);
    const notice = await Notice.findById(noticeId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(!notice){
      return res.status(404).json({message:"Notice not found!"});
    }

    const studentParameters = user.studentParameters;

    if(!studentParameters.noticeStored.includes(notice._id)){
      //store notice
      await studentParameters.noticeStored.push(notice._id);
      await user.save();

      res.status(200).json({message:"Notice stored"});
    }else{
      //unstore notice
      await studentParameters.noticeStored.pull(notice._id);
      await user.save();
      
      res.status(200).json({message:"Notice unstored"});
    }


  } catch (error) {
    console.log("Error in noticeStore controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const myNoticeStored = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const user = await User.findById(userId);

    res.status(200).json(user.studentParameters.noticeStored);
  } catch (error) {
    console.log('Error in NoticeStoreController', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const myStoredNoticesProfile = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const user = await User.findById(userId).populate({
      path: 'studentParameters.noticeStored',
      select: 'title text img video'
    });

    res.status(200).json(user.studentParameters.noticeStored);
  } catch (error) {
    console.log('Error in NoticeStoreController', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const opportunites = async(req,res)=>{
  
}

export const breakingNews = async(req,res)=>{

}


//Old students

export const oldStudents = async(req,res)=>{
  try {
     
    const oldStudents = await User.find({typeUser:"old student"});

    res.status(200).json(oldStudents);
  } catch (error) {
    console.log("Error in fetchingOldStudents", error.message);
    res.status(500).json({message:"Internal Server Error!"})
  }
}

export const createNotices = async(req,res)=>{
   let {title,text,img,video} = req.body 
    const {_id:userId} = req.user

   try {
      
    if(!text || !title){
        return res.status(400).json({message:"Write anything and put the title!"});
    }

    const notice = await Notice.findOne({title,text});

    if(notice){
        return res.status(400).json({message:"Notice as been created!"});
    }

    if(img){
        img = await uploadFile(img);
    }

    if(video){
        const fileUpload = await cloudinary.uploader.upload(video,({
          resource_type:"video"
        }))
        video = await fileUpload.secure_url;
    }

    const user = await User.find({_id:{$ne:userId}});

    const newNotice = new Notice({
        userId,
        title,
        text,
        img,
        video
    })

    await newNotice.save();
    
    //Send Notification for all Students
    

    res.status(200).json(newNotice);
    
   } catch (error) {
     console.log("Error in createNoticeController ",error.message);
     res.status(500).json({message:"Internal Server Error!"});
   }
}


export const myNotices = async(req,res)=>{
  const {_id} = req.user;
   const {page, limit} = req.query



  try {
    
    if(!mongoose.isValidObjectId(_id)){
       return res.status(400).json({message:"Invalid objectId"});
    }

    const user = await User.findById(_id);

    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    
    let currentPage = (Number(page));
    let limitPage = (Number(limit));

    const skip = (currentPage - 1) * limitPage


    const total = await Notice.countDocuments({userId:_id});
      const totalPages = Math.ceil((total / limit))


    const myNotices = await Notice.find({userId:_id})
    .skip(Number(skip || 1))
    .limit(Number(limit));


    res.status(200).json({
      myNotices,
      totalPages,
      currentPage
    });
  } catch (error) {
    console.log("Error inMyNiticesController ",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}


export const deleteNotice = async(req,res) =>{
    const {id} = req.params

    try {
        
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({message:"Put valid objectId"})
        }

        const notice = await Notice.findByIdAndDelete(id);
    
         if(!notice){
            return res.status(404).json({message:"Notice not found!"});
         }

        if(notice?.img){
            const pulicId = notice.img
            .split("/")
            .slice(-1)[0]
            .split(".")[0];
            
            await cloudinary.uploader.destroy(pulicId)
        }

        if(notice?.video){
            const pulicId = notice.video
            .split("/")
            .slice(-1)[0]
            .split(".")[0];
            
            await cloudinary.uploader.destroy(pulicId)
        }

        res.status(200).json({message:"Notice Deleted successfully!"})

    } catch (error) {
        console.log("Error inDeleteNoticeController ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}



export const updateNotice = async(req,res)=>{
  const {id} = req.params;
   const {title, text} = req.body

   try {
     if(!mongoose(isValidObjectId(id))){
      return res.status(400).json({message:"Internal Server Error"});
     }

     const notice = await Notice.findById(id);

     if(!notice){
      return res.status(404).json({message:"Notice not found!"});
     }
     
     notice.title = title;
     notice.text = text;
     
     await notice.save();

     res.status(200).json(notice);

   } catch (error) {
     console.log(error.response?.data?.message);
     res.status(500).json({message:'Internal Server Error'})
   }
}


