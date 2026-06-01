import mongoose from "mongoose";




const forumSchema = new mongoose.Schema({
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    course:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    year:{
     type:String,
     required:true
    },
    description:{
        type:String,
        required:true
    },
    posts:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            post:{
                type:String
            }
        }
    ]
});


const Forum = mongoose.model("Forum", forumSchema);


export default Forum;




