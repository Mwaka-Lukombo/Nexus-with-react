import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  fullname:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  course:{type:String},
  year:{type:String},
  profileImg:{type:String,default:""},
    typeUser:{
    type:String,
    enum:["student","old student","teacher"],
    default:"student"
  },
  studentParameters:{
    friends:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    follow:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    noticeStored:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notice"
      }
    ]
  },
  oldParameters:{
      followers:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        }
      ],
     biography:{
      type:String
     },
      bannerProfile:{type:String,default:""},
      experience:{type:String,default:""},
      empresas:[],
      about:{type:String,default:""},
      causes:{type:String,default:""}   
    }
  
},{
    timestamps:true 
})

const User = mongoose.model("User",userSchema);

export default User;
