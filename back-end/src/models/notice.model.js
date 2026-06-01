import mongoose from "mongoose";



const noticeSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.Object,
    ref:"User",
    required:true
  },
  title:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  img:{
    type:String,
  },
  video:{
    type:String
  },
  likes:[
    {
     type:mongoose.Schema.Types.ObjectId   
    }
  ],
  comments:[
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        noticeId:{
          type:mongoose.Schema.Types.ObjectId,
          Ref:"Notice"
        },
        comment:{
            type:String
        }
    }
  ]
},{
    timestamps:true
});



export const Notice = mongoose.model("Notice",noticeSchema);





