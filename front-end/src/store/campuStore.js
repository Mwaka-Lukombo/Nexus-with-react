import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { messageStore } from './messageStore';




export const campusStore = create((set,get) => ({
    students:[],
    oldStudents:[],
    singleStudent:{},
    friendSolicitations:[],
    myFriendsSolicitations:[],
    selectedUser:null,
    Friends:[],
    notifications:[],
    theme:localStorage.getItem("data-theme") || "light",
    isSingle:false,
    isOlding:false,
    isUpdateProfileOld:false,
    isLoading:false,
    isMyFriend:false,
    getAllStudents:async(page)=>{
        set({isLoading:true});
        try {
            const res = await axiosInstance.get(`/campus?page=${page}&&limit=8`);
            set({students:res.data});
        } catch (error) {
            console.log(error.message);
        }finally{
            set({isLoading:false});
        }
    },
    addFriend:async(id)=>{
        try {
            const res = await axiosInstance.post(`/campus/friend/${id}`);
            
            set({myFriendsSolicitations:[...get().myFriendsSolicitations,id]});
            toast.success("Request friend sended successfully!");
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    },
    mySolicitations:async()=>{
        try {
            const res = await axiosInstance.get('/campus/friend');
            set({friendSolicitations:res.data});
        } catch (error) {
            console.log(error.message);
            toast.error(error.response?.data?.message);
        }
    },
    acceptFriend: async (id,user) => {
  try {
    const res = await axiosInstance.post(`/campus/friend/accept/${id}`);


        set({
        Friends: [...get().Friends, user.from],
        friendSolicitations: get().friendSolicitations.filter(
            (req) => req._id !== id
        ),
        });

    await get().mySolicitations();
    await get().getAllStudents();

    toast.success("Friend accepted successfully!");
  } catch (error) {
    console.log(error.message);
    toast.error(error.response?.data?.message);
  }
},
rejectFriend:async(id)=>{
    try {
        const {friendSolicitations} = get();
        const res = await axiosInstance.delete(`/campus/friend/reject/${id}`);
         let newFriendsSolicitations = friendSolicitations.filter((prev) => prev._id !== id);
         set({friendSolicitations:newFriendsSolicitations});

         toast.success("Request rejected successfully!");

    } catch (error) {
        console.log(error.message);
        toast.error(error.response?.data?.message);
    }
},
myFriends:async()=>{
    set({isMyFriend:true});
    try{
      const res = await axiosInstance.get('/campus/myFriends');
      set({Friends:res.data});
    }catch(error){
        console.log(error.message);
    }finally{
        set({isMyFriend:false})
    }
},
removeFriend:async(id)=>{
    try {
        const res = await axiosInstance.delete(`/campus/friend/removeFriend/${id}`);

        set(()=> ({
            Friends:[...get().Friends.filter((prev) => prev._id !== id)]
        }))

        toast.success("Friend moved Successfully!");
    } catch (error) {
        toast.error(error.response?.data?.message);
    }
},
getNotifications:async()=>{
 try {
    const res = await axiosInstance.get('/notification/getNotifications');
    set({notifications:res.data});
 } catch (error) {
    console.log(error.message);
 }
},
readNotification:async()=>{
  try {
     const res = await axiosInstance.patch('/notification/readNotification');
     
  } catch (error) {
     console.log(error.message);
  }
},
deleteNotifications:async()=>{
  try {
    const res = await axiosInstance.delete('/notification/deleteNotifications');  

    await get().getNotifications();
  } catch (error) {
      console.log(error.message);
  }
},
deleteNotification:async(id)=>{
  try {
    const res = await axiosInstance.delete(`notification/deleteNotification/${id}`);

    await get().getNotifications();
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
},
setSelectedUser:async(data)=>{
    set({selectedUser:data});
    messageStore.setState({messages:[]});
},
setTheme:async(theme)=>{
   set({theme:theme})
   localStorage.setItem("data-theme",theme)
},
//Old students
getOldStudens:async(req,res)=>{
    set({isOlding:true});
    try{
     const res = await axiosInstance.get('/campus/oldStudents');
     set({oldStudents:res.data});

    }catch(error){
      console.log(error.message);
    }finally{
        set({isOlding:false})
    }
},
updateOldProfile:async(data)=>{
    set({isUpdateProfileOld:true});

    try {
        const res = await axiosInstance.patch(`/campus/updateOld`,data);

        toast.success("Profile updated successfully");

        await get().oldStudents();

    } catch (error) {
        toast.error(error.resposne?.data?.message);
    }finally{
        set({isUpdateProfileOld:false});
    }
},
getSingleUser:async(id)=>{
    set({isSingle:true});
    try {
        const res = await axiosInstance.get(`/campus/singleOld/${id}`);
        set({singleStudent:res.data});
    } catch (error) {
        console.log(error.message);
    }finally{
        set({isSingle:false});
    }
}
}))





