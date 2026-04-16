
import mongoose from 'mongoose';





const classSchema = new mongoose.Schema({
  nameClass:{
    type:String,
    required:true
  },
  teacherId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  course:{type:String,required:true},
  year:{type:Number,required:true},
  material:[
    {
        type:{
            type:String,
            enum:['video','file'],
            required:true
        },
        materialName:{type:String},
        description:{type:String}
    }
  ],
  activites:[
    {
        name:{type:String},
        title:{type:String},
        date:{type:Date,default:Date.now},
        comment:[
            {
                text:{type:String},
                userId:{type:mongoose.Schema.Types.ObjectId}
            }
        ]
    }
  ],
  comments:[
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    comment: {
      type: String,
      required: true,
      trim: true
    }
  }
  ],
  bannerClass:{type:String, default:""}
},{
    timestamps:true
})


const Class = mongoose.model('Class',classSchema);

export default Class;