import {axiosInstance} from '../lib/axios';
import {create} from 'zustand';
import {
    toast
} from 'react-hot-toast';



export const forumStore = create((set,get) => ({
    forums:[],
    forum:{},
    isLoading:false,
    isGeting:false,
    getFoum:async()=>{
        try {
            const res = await axiosInstance.get('/forum');
            set({forums:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    },
    getForumSingle:async(id)=>{
        try {
            const res = await axiosInstance.get(`/forum/singleForum/${id}`);
            set({forum:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    },
    createForum:async(data)=>{
        set({isLoading:true});
        try {
            const res = await axiosInstance.post('/forum',data);
            set({forums:res.data});

            toast.success("Forum created Successfully!");
            await get().getFoum();
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }finally{
            set({isLoading:false})
        }
    }
}))





