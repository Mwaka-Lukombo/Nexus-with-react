import { create } from "zustand";
import { axiosInstance } from "../lib/axios";





export const messageStore = create((set,get) => ({
messages:[],
isMessaging:false,
getMessages:async(id)=>{
    set({isMessaging:true});
    try {
        const res = await axiosInstance.get(`/message/${id}`);
        set({messages:res.data})
    } catch (error) {
        console.log(error.response?.data?.message);
    }finally{
        set({isMessaging:false});
    }
},
createMessage:async(dataMessage,id)=>{
    try {
        const res = await axiosInstance.post(`/message/create/${id}`,dataMessage);
        set({messages:[...get().messages,res.data]});

        console.log(res.data)
        
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}
}));