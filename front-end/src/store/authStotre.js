import {create} from 'zustand';
import {toast} from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { campusStore } from './campuStore';
import { aluminStore } from './aluminStore';
import io from 'socket.io-client'



const BASE_URL = 'http://localhost:5000';
export const authStore = create((set,get) => ({
 userAuth:null,
 user:{},
 socket:null,
 onlineUsers:[],
 isCheking:true,
 isLogging:false,
 isCreate:false,
 isCheking:true,
 isUpdateding:false,
 sign:async(data)=>{
    set({isCreate:true});
    try {
        const res = await axiosInstance.post('/auth/sign',data);

        console.log(res.data)

        set({userAuth:res.data});
        toast.success("Created successfully!");
        get().getSocket();
    } catch (error) {
        toast.error(error.response?.data?.message);
        console.log(error.message);
    }finally{
        set({isCreate:false});
    }
 },
 login:async(data)=>{
    set({isLogging:true});
    try {
        const res = await axiosInstance.post('/auth/login',data);
        set({userAuth:res.data});
        toast.success("Logging successfully!");
        get().getSocket();
    } catch (error) {
        toast.error(error.response?.data?.message);
        console.log(error.message);
    }finally{
      set({isLogging:false})
    }
 },
 
 getSocket:()=>{
  const {userAuth} = get();

    const socket = io("http://localhost:5000",({
      //OPTIONS
      query:{
        userId:userAuth._id
      }
    }))

    console.log("A iniciar com o socket!")

    set({socket:socket});
 },
 disconnectSocket:()=>{
  const {socket} = get();

  if(socket.connected) socket.disconnect();
 },
 logout:async()=>{
  
   try {
    const res = await axiosInstance.post('/auth/logout');
    set({userAuth:null})

    campusStore.setState({selectedUser:null});
    campusStore.setState({Friends:[]});
    campusStore.setState({myFriendsSolicitations:[]});
    aluminStore.setState({myStoreds:[]});
    
    toast.success("Logout successfully")
    get().disconnectSocket();
   } catch (error) {
     toast.error(error.response?.data?.message);
   }
 },
 updatePorfile:async(data)=>{
  set({isUpdateding:true});
  try {
    const res = await axiosInstance.post(`/auth/profile`,data);
    set({userAuth:res.data});
    toast.success("Profile updated successfully!");

    get().disconnectSocket();
  } catch (error) {
    toast.error(error.response?.data?.message);
  }finally{
    set({isUpdateding:false})
  }
 },
 check: async () => {
  try {
    const res = await axiosInstance.get('/auth/me');
    set({ userAuth: res.data });
    get().getSocket();
  } catch (error) {
    set({ userAuth: null });
  } finally {
    set({ isCheking: false });
  }
}
}))



