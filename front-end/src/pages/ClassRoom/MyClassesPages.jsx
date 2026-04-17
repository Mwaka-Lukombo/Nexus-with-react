import React, { useEffect } from 'react';
import {
  Link
} from 'react-router-dom';
import { classStore } from '../../store/classStore';
import { authStore } from '../../store/authStotre';
import {
  Trash
} from 'lucide-react'
import { BannerClass } from '../../components/common/BannerClass';
import { MyClassSkeleton } from '../../components/skeletons/Class/MyClassSkeleton';






export const MyClassesPages = () => {
  const {
    getClasseRooms,
    classRooms,
    isGetClass,
    deleteClass
  } = classStore();

  const {
    userAuth
  } = authStore();

  useEffect(()=>{
    getClasseRooms();
  },[getClasseRooms]);


  const myClasses = classRooms.filter((prev) => prev.teacherId?._id === userAuth?._id);

  if(isGetClass){
    return <MyClassSkeleton />
  }



  return (
    <div className='p-2'>
      <BannerClass />

      {myClasses?.length === 0 && (
        <div className='w-full h-[80px] flex flex-col-reverse p-2 items-center justify-center'>
          <p>Your dont have classRooms</p>
          <h3 className='text-6xl animate-pulse'>👻</h3>
          </div>
      )}
      <div className='w-full grid md:grid-cols-4 gap-3'>
        {Array.isArray(myClasses) && myClasses.map((curr) => (
          <Link to={`single/${curr?._id}`} className='col-span-1 h-[300px] transition duration-300 border border-[#ccc] rounded-xl shadow-xl
          hover:translate-y-[-10px]
          '>
          <div className='relative w-full h-[145px] rounded-tl-xl rounded-tr-xl'>
            
            <img src={curr?.bannerClass} 
             className='w-full h-full bg-cover bg-no-repeat rounded-tl-xl rounded-tr-xl'
            />
            
             {/* Overlay */}
            <div className='absolute top-0 left-0 w-full h-full bg-black/50 rounded-tl-xl rounded-tr-xl'>
              
              <div className='absolute top-2 p-3 text-white'>
              <h1 className='text-2xl font-normal leading-normal'>{curr?.course}</h1>
              <h3 className='text-xl font-mono'>{curr?.nameClass}</h3>
              <p className='text-sm'>{curr?.teacherId?.fullname}</p>
              <p className='text-sm font-bold'>{curr?.year}</p>
            </div>
            
            <div className='absolute right-10 bottom-[-40px] w-[80px] h-[80px] rounded-full ring-2 ring-secundary-color border border-[#ccc]'>
              <img src={curr?.teacherId?.profileImg || "/avatar.png"} 
              className='w-full h-full bg-cover bg-no-repeat rounded-full'
              />
            </div>

            </div>
          </div>

          <div className='relative w-full h-[155px] rounded-bl-xl rounded-br-xl'>
            <div className='flex items-center justify-end px-2 absolute w-full h-[60px] bottom-0 border-t border-[#ccc]'>
               <button onClick={(e) => {
                e.preventDefault();
                deleteClass(curr?._id);
                if(!confirm("Your need delete this classRoom?")) return;
               }} className="btn bg-error hover:bg-red-500 flex items-center justify-center">
               <Trash className='size-5 text-white' />
               </button>               
            </div>
          </div>


        </Link>
        ))}
      </div>
    </div>
  )
}
