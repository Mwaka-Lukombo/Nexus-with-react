import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";




export const aluminStore = create((set,get) => ({
isNotice:false,
isUpdating:false,
notices:[],
comments:[],
myNotices:[],
myStoreds:[],

getNotices:async()=>{
    set({isNotice:true})
 try {
    const res = await axiosInstance.get('/alumin');
    set({notices:res.data});
 } catch (error) {
    console.log(error.response?.data?.message);
 }finally{
    set({isNotice:false})
 }
},
like:async(id)=>{
  try {
     const res = await axiosInstance.post(`/alumin/like/${id}`);

     await get().getNotices();
  } catch (error) {
    toast.error(error.response?.data.message);
  }
},
stored:async(id)=>{
  
    try {
        const res = await axiosInstance.post(`/alumin/noticeStore/${id}`);
    
        await get().getMyStoreds();
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
},
getMyStoreds:async()=>{
    try {
        const res = await axiosInstance.get('/alumin/myStored');
        set({myStoreds:res.data});
    } catch (error) {
        console.log(error.message);
    }
},
getComments:async(id)=>{
  try {
     const res = await axiosInstance.get(`/alumin/getComments/${id}`);
     set({comments:res.data.comments});
  } catch (error) {
     console.log(error.response?.data?.message);
  }
},
createComment:async({comment},id)=>{
 try {
    const res = await axiosInstance.post(`/alumin/comment/${id}`,{comment});
    set({comments:[...get().comments,res.data]});

    await get().getNotices();
 } catch (error) {
    console.log(error.message);
 }
},
getNoticeSingle:async(id)=>{
    set({isNotice:true});
  try {
      const res = await axiosInstance.get(`/noticeSingle/${id}`);
  } catch (error) {
      console.log(error.message);
  }finally{
    set({isNotice:false})
  }
},
//Old students
createNotice:async(data)=>{
    console.log(data)
    set({isNotice:true});
    try{
     const res = await axiosInstance.post('/alumin/create',data);
     
     set({notices:[...get().notices,res.data]});
    
     toast.success("Notice created successfully!");

     await get().getMyNotices()
     await get().getNotices()
    }catch(error){
      toast.error(error.response?.data?.message);
    }finally{
        set({isNotice:false});
    }
},
getMyNotices:async(page)=>{
    try {
        const res = await axiosInstance.get(`/alumin/myNotices?page=${page}&&limit=5`);
        set({myNotices:res.data});
    } catch (error) {
        console.log(error.message);
    }
},
updateNotice:async(id,data)=>{
    set({isUpdating:true});
 try {
    const res = await axiosInstance.patch(`/updateNotice/${id}`,data)
 } catch (error) {
    console.log(error.message);
 }finally{
    set({isUpdating:false})
 }
},
//review this point
deleteNotice:async(id)=>{
    try {
        
        const res = await axiosInstance.delete(`/alumin/${id}`);
        
        
        toast.success('Notice deleted successfully!');
        
        await get().getMyNotices()
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
}
}))






