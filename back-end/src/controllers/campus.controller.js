
import User from "../models/user.model.js"
import Friend from "../models/friend.model.js";
import Notification from '../models/notification.model.js'
import mongoose from "mongoose";
import cloudinary from '../lib/cloudinary.js';


export const getAllStudents = async(req,res)=>{
   const myId = req.user._id
      let {page, limit} = req.query

     try {

      
      page = Number(page);
      limit = Number(limit);

      let total = await User.find().countDocuments();

       let skip = (page - 1) * limit ;

         const totalPages = Math.ceil((total / limit));
      
        const users = await User.find({
         typeUser:"student",
         _id:{$ne:myId}
        }).skip(Number(skip))
        .limit(Number(limit))

        if(!users){
            return res.status(404).json({message:"Dont have users!"});
        }

        res.status(200).json({
         users,
         totalPages:totalPages,
         currentPage:page
        })
     } catch (error) {
        console.log("Error in fetching all Users", error.message);
        res.status(500).json({message:"Internal Server Error"})
     }
}




export const friendRequest = async(req,res)=>{
   const {id:userTo} = req.params;
    const {_id:userFrom} = req.user._id

    
   try {

      if(!mongoose.isValidObjectId(userTo)){
         return res.status(400).json({message:"Put valid id!"})
      }

      if(userFrom.toString() === userTo.toString()){
         return res.status(400).json({message:"You dont can send friend solicitation to youself"});
      }

      const friend = await Friend.findOne({from:userFrom,to:userTo});
      const user = await User.findById(userFrom);

      if(friend){
         return res.status(400).json({message:"Request as sending!"});
      }

      //the receiver solicite to sender friend request
      const receiverSendRequest = await Friend.findOne({from:userTo,to:userFrom});

      if(receiverSendRequest){
         return res.status({message:"This user as solicitate, check your solicitations!"});
      }

      const newRequest = new Friend({
         from:userFrom,
         to:userTo
      })

      await newRequest.save();
      
      await Notification.insertOne({
         to:userTo, 
         from:userFrom,
         title:"Friend Request",
         text:`${user?.fullname} wont to be your friend`,
         typeNotification:"friend request"

      });

      res.status(201).json(newRequest);
      
   } catch (error) {
      console.log("Error in friendController ",error.message);
      res.status(500).json({message:"Internal Server Error"});
   }
}



export const getFriendsRequests = async(req,res)=>{
   const {_id} = req.user

   try {
      const user = await User.findById(_id);

      if(!user){
         return res.status(404).json({message:"User not found!"});
      }

      //getRequests
      const request = await Friend.find({to:_id,status:{$ne:"accepted"}}).populate({
         path:"from",
         select:"-password"
      });

      res.status(200).json(request);
   } catch (error) {
      console.log("Error in acceptFriendController ", error.message);
      res.status(500).json({message:"Internal Server Error!"});
   }
}


export const acceptFriends = async(req,res)=>{
     const {_id} = req.user 
      const {id:userId} = req.params
     try {

         const user = await User.findById(_id);
         const userFromData = await User.findById(userId);

         if(!user){
            return res.status(404).json({message:"User not found!"});
         }

         //getSolications
         const solicitation = await Friend.findOne({from:userId,to:_id});

         if(solicitation.status === "accepted"){
            return res.status(400).json({message:"Your are friends!"})
         }

         await Friend.findByIdAndUpdate(solicitation._id,{status:"accepted"},{new:true});

          if(user.studentParameters.friends.includes(userId) || userFromData.studentParameters.friends.includes(user._id)){
            return res.status(400).json({message:"you are friends"})
          }

          
          
          user.studentParameters.friends.push(userId);
          userFromData.studentParameters.friends.push(user._id);
          
          await user.save();
          await userFromData.save();

         res.status(200).json(user.studentParameters.friends);
        
     } catch (error) {
       console.log("Error in acceptFriend Controller ",error.message);
     }
}


export const rejectedFriend = async(req,res)=>{
   const {id:solicitationId} = req.params 

     try{

      const solicitation = await Friend.find({_id:solicitationId});

       //optimise the code
      if(solicitation.status == "accepted") return;

      await Friend.findByIdAndDelete(solicitationId);
      
      res.status(200).json({message:"Friend request as rejected"});
     }catch(error){
       console.log("Error in rejectedController ",error.message);
       res.status(500).json({message:"Internal Server Error"});
     }
}



export const myFriends = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id).populate({
      path: "studentParameters.friends",
      select: "fullname email profileImg"
    });

    if (!user || user.studentParameters.friends.length === 0) {
      return res.status(404).json({ message: "You dont have friends!" });
    }

    
    res.status(200).json(user.studentParameters.friends);

  } catch (error) {
    console.log("Error in myFriendsController ", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};


export const removeFriend = async(req,res)=>{
   const {id} = req.params;
      const {_id:myId} = req.user;
   try{

      if(!mongoose.isValidObjectId(id)){
         return res.status(400).json({message:"Put valid objectId"});
      }

      const currentUser = await User.findById(myId);
       const outherUser = await User.findById(id);

       if(!currentUser || !outherUser){
         return res.status(404).json({message:'Users not found!'});
       }

       const previousRequest = await Friend.findOne({
            $or:[
               {from:currentUser,to:outherUser},
               {from:outherUser,to:currentUser}
            ]
         })

         if(!previousRequest){
            return res.status(400).json({message:"Something wet wrong!"});
         }

       if(currentUser.studentParameters.friends.includes(outherUser._id) || 
         outherUser.studentParameters.friends.includes(currentUser._id)
        ){
         
         currentUser.studentParameters.friends.pull(outherUser._id);
         outherUser.studentParameters.friends.pull(currentUser._id);

         
         
         //delete messages from this users in database
         await Friend.findByIdAndDelete(previousRequest._id);
         currentUser.save();
         outherUser.save();

         res.status(200).json({message:"User removed successfully!"})
       }

   }catch(error){
        console.log("Error inRemoveFriendController ",error.message);
        res.status(500).json({message:"Internal Server Error!"});
   }
}




// old students
export const getOldStudents = async(req,res)=>{

   try {
      const students = await User.find(
         {typeUser:"old student",_id:{$ne:req.user._id}}
      );
      
      if(!students) return res.status(404).json({message:"Old students not found!"});

      res.status(200).json(students)
   } catch (error) {
      console.log("ErrorInGetOldStudentController ",error.message);
      res.status(500).json({message:"Internal Server Error"})
   }
}



export const oldProfile = async(req,res)=>{
   const {
      bannerProfile, 
      experience, 
      empresas,
      about,
      causes,
      social1,
      social2,
      social3,
      primario,
      secundario,
      superior
   } 
   = req.body;
   
    const {_id:userId} = req.user
    let banner = "";
    

   try {
      if(!causes || !about){
        return res.status(400).json({message:"write anything!"});
     }

     const user = await User.findById(userId);

     if(!user) return res.status(404).json({message:"User not found!"});

     const toEdit = user.oldParameters;

     if(bannerProfile){
       const file = await cloudinary.uploader.upload(bannerProfile);
       banner = await file.secure_url;
     }

     toEdit.bannerProfile = banner;
     toEdit.experience = experience;
     toEdit.empresas.push(empresas.trim().split(','));
     toEdit.about = about;
     toEdit.causes.push(causes.trim().split(','));
     toEdit.redes.push([social1,social2,social3]);
     toEdit.school.push({primario,secundario,superior});

      await user.save();

      res.status(200).json(user);

   } catch (error) {
      console.log("ErrorInUpdateOldStudentController ",error.message);
      res.status(500).json({message:"Internal Server Error"})
   }
}


export const getSingleOld = async(req,res)=>{
   const {id} = req.params;

   try {
      if(!mongoose.isValidObjectId(id)){
         return res.status(400).json({message:"Put valid objectId"})
      }

      const user = await User.findById(id);

      if(!user) return res.status(404).json({message:"User not found!"});

      res.status(200).json(user);
   } catch (error) {
      console.log("ErrorInSingleOldController ",error.message);
      res.status(500).json({message:"Internal Server Error"})
   }
}


export const followUser = async(req,res)=>{
   const {id} = req.params;
    const {_id:userId} = req.user;

    try {
      if(!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(userId)){
         return res.status(400).json({message:"Put valid id"});
      }


      const currentUser = await User.findById(_id);
       const userToFollow = await User.findById(userId);

       if(!currentUser || !userToFollow){
         return res.status(404).json({message:"Users not found"});
       }

       const toFollowParameters = userToFollow.oldParameters;

       if(!toFollowParameters.followers.includes(currentUser._id)){
         //Follow
         await toFollowParameters.push(currentUser._id);
         await toFollowParameters.save();

         if(currentUser.typeUser === 'student'){
           await currentUser.studentParameters.follow.push(userToFollow._id);
           await currentUser.save();

           res.status(200).json({message:"Follow"});
         }else if(currentUser.typeUser === 'old student'){
            await currentUser.oldParameters.follow.push(userToFollow._id);
            await currentUser.save();

            res.status(200).json({message:"Follow"});
         }
         
      }else{
         //Unfollow
         await toFollowParameters.pull(currentUser._id);
         await toFollowParameters.save();

         if(currentUser.typeUser === 'student'){
           await currentUser.studentParameters.follow.push(userToFollow._id);
           await currentUser.save();

           res.status(200).json({message:"Follow"});
         }else if(currentUser.typeUser === 'old student'){
            await currentUser.oldParameters.follow.push(userToFollow._id);
            await currentUser.save();

            res.status(200).json({message:"Follow"});
         }
       }

      
    } catch (error) {
      console.log("ErrorInFollowController ",error.message);
      res.status(500).json({message:"Internal Server Error"})
    }
}







