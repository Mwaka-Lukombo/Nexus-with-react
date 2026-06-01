import mongoose from "mongoose";





const messageSchema = new mongoose.Schema({
 from:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
 },
 to:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
 },
 text:{
    type:String
 },
 img:{
    type:String
 },
 link:{
    type:String
 }
},{
    timestamps:true
})



const Message = mongoose.model("Message",messageSchema);

export default Message;
