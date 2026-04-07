
import Forum from "../models/forum.model.js";





export const createForum = async(req,res)=>{
    const {_id:teacher_id} = req.user 
      const {course,topic,year} = req.body;


    try {
        
        if(!course || !topic || !year){
            return res.status(400).json({message:"All fields are required!"});
        }

        const forum = await Forum.findOne({course,topic,year});

        if(forum){
            return res.status(400).json({message:'Forum as created Successfully'})
        }

        const newForum = new Forum({
            course,
            topic,
            year,
            teacher_id
        })

        await newForum.save();

        res.status(200).json(newForum);
    } catch (error) {
        console.log("Error in createForumController ",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}



export const postForum = async(req,res)=>{
    const {_id} = req.user 
     const {post} = req.body
      const {id:forumId} = req.params 

    try {

        if(!post){
            return res.status(400).json({message:"Write anything!"})
        }

        const forum = await Forum.findById(forumId);

        const newPost = {
            userId:_id,
            post
        }

        if(forum.posts.includes(newPost)){
            return res.status(400).json({message:"Wait your have many requests1"})
        }

        await forum.posts.push(newPost);
        await forum.save();

        res.status(200).json(forum.posts);
        
    } catch (error) {
        console.log("Error in postForumController ",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}



export const getAllForuns = async(req,res)=>{

    try {
        const foruns = await Forum.find();

        res.status(200).json(foruns)
    } catch (error) {
        console.log("Error in fetchForumController ",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}

export const getForumSingle = async(req,res)=>{
    const {_id} = req.user 
    try {
        const foruns = await Forum.find({teacher_id:_id});

        res.status(200).json(foruns)
    } catch (error) {
        console.log("Error in fetchForumController ",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}


export const getPosts = async(req,res)=>{
    try {
        
        const posts = await Forum.find().populate({
            path:"posts.userId",
            select:"-password -friends -empresas"
        });

        if(!posts){
            return res.status(400).json({message:"Dont have posts"})
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error in fetchForumPostController ",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}

export const deleteForum = async(req,res)=>{
    const {id} = req.params 

    try {
        
        const forum = await Forum.findByIdAndDelete(id);

        if(!forum){
            return res.status(400).json({message:"Forum not found!"});
        }

        res.status(200).json({message:"Forum deleted successfully!"});
    } catch (error) {
        console.log("Error in deleteForumController ",error.message);
        res.status(500).json({message:"Internal Server Error!"})
    }
}

