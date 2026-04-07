import mongoose from "mongoose";




const notificationSchema = new mongoose.Schema({
  to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  from:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  typeNotification:{
    type:String,
    enum:['friend request',"forum","classRoom","message","like"]
  },
  read:{
    type:Boolean,
    default:false
  }
},{
    timestamps:true
})



const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;