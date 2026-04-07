
import mongoose from 'mongoose';



const friendSchema = new mongoose.Schema({
  from:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  status:{
    type:String,
    enum:['pending','accepted'],
    default:"pending"
  }
},{
    timestamps:true
})


const Friend = mongoose.model("Friend",friendSchema);

export default Friend; 



