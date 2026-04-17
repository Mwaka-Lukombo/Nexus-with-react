import {axiosInstance} from '../lib/axios';
import {create} from 'zustand';
import {toast} from 'react-hot-toast';




export const classStore = create((set,get) => ({
 isLoading:false,
 isGetClass:false,
 classRooms:[],
 classRoom:{},
 students:[],
 getStudents:async()=>{
  try {
    const res = await axiosInstance.get('/class/students');
    set({students:res.data});
  } catch (error) {
    console.log(error.response?.data?.message);
  }
 },
 createClass:async(data)=>{
    set({isLoading:true});
    try {
        const res = await axiosInstance.post('/class/createClass',data);

        toast.success('ClassRoom created successfully!');

        await get().getClasseRooms();
    } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
    }finally{
        set({isLoading:false});
    }
 },
 getClasseRooms:async()=>{
  set({isGetClass:true});

  try {
     const res = await axiosInstance.get('/class');
     set({classRooms:res.data});
  } catch (error) {
    toast.error(error.response?.data?.message);
  }finally{
    set({isGetClass:false});
  }
 },
 getClassSingle:async(id)=>{
  
   try {
     const res = await axiosInstance.get(`/class/classSingle/${id}`);
     set({classRoom:res.data});
   } catch (error) {
    console.log(error.message);
    toast.error(error.response?.data?.message); 
   }
 },
 deleteClass:async(id)=>{
  try {
    const res = await axiosInstance.delete(`/class/classSingle/${id}`);
    
    toast.success(res.data?.message);

    await get().getClasseRooms();
  } catch (error) {
    console.log(error.message);
    toast.error(error.response?.data?.message);   
  }
 }
}));







