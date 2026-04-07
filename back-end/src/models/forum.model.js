import mongoose from "mongoose";




const forumSchema = new mongoose.Schema({
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
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
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




