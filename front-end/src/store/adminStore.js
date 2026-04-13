import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {create} from 'zustand';





export const adminStore = create((set,get) => ({
 Allusers:[],
 isLoading:false,
 getAllUsers:async(page = 1)=>{
    try {
        const res = await axiosInstance.get(`/admin/getAllUsers?page=${page}&&limit=6`);
        set({Allusers:res.data});
    } catch (error) {
        console.log(error.message);
    }
 },
 createUser:async(data)=>{
    set({isLoading:true});
    try {
        const res = await axiosInstance.post('admin/create',data);
        
        toast.success("User created successfully");
        await get().getAllUsers();
    } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
    }finally{
        set({isLoading:false});
    }
 },
 deleteUser:async(id)=>{
    try {
        const res = await axiosInstance.delete(`/admin/delete/${id}`);

        toast.success(res?.data?.message);

      await get().getAllUsers()
    } catch (error) {
        toast.error(error.response?.data?.message);
        console.log(error.message);
    }
 }
}));


