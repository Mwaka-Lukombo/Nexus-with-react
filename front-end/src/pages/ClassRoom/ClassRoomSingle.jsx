import React, { useEffect, useState } from 'react'
import { BannerClass } from '../../components/common/BannerClass'
import { classStore } from '../../store/classStore';
import { useParams } from 'react-router-dom';
import {
    Book,
    BookAIcon,
    BookmarkIcon,
    Pencil
} from 'lucide-react';
import { campusStore } from '../../store/campuStore';

export const ClassRoomSingle = () => {
    const [page, setPage] = useState("mural");

    const {id} = useParams();
    

    const {
        getClassSingle,
        classRoom,
        getStudents,
        students
    } = classStore();



    useEffect(()=>{
     getClassSingle(id);
    },[getClassSingle,id]);

    useEffect(()=>{
     getStudents();
    },[getStudents,id]);



  const myStudenstClass = students.filter((prev) => 
   prev?.course === classRoom?.course && Number(prev?.year) === classRoom?.year 
)


const userName = (email) => {
    const [name, domain] = email.split("@");
      const realName = name[0].toUpperCase() + name.slice(1,3);

      return realName.padEnd(realName.length + 3, '*') + domain.padStart(domain.length + 1,"@");
}

  return (
    <div>
        <div className='flex items-center justify-start w-full h-[50px] mb-4 '>
         <ul className='flex'>
            <li onClick={() => setPage('mural')} className='relative  w-[100px] h-[50px] flex items-center justify-center hover:bg-[#ccc] cursor-pointer transition'>
                <span>Mural</span>
                
                {page === 'mural' && <div className='absolute bottom-0 w-[100px] h-2 bg-secundary-color rounded-xl'></div>}
            </li>
            <li onClick={() => setPage('activites')} className='relative  w-[100px] h-[50px] flex items-center justify-center hover:bg-[#ccc] cursor-pointer transition'>
                <span>Activites</span>
                {page === 'activites' && <div className='absolute bottom-0 w-[100px] h-2 bg-secundary-color rounded-xl'></div>}
            </li>
            <li onClick={() => setPage('people')} className='relative  w-[100px] h-[50px] flex items-center justify-center hover:bg-[#ccc] cursor-pointer transition'>
                <span>People</span>
                {page === 'people' && <div className='absolute bottom-0 w-[100px] h-2 bg-secundary-color rounded-xl'></div>}
            </li>
         </ul>
        </div>

     {page === 'mural' && (  
       <>
       <div className={`relative w-full h-[250px] border border-[#ccc] shadow-xl rounded-xl`}>
        <img src={classRoom?.bannerClass}
        className='absolute w-full h-full rounded-xl bg-cover bg-center bg-no-repeat'
        />
        {/* Overlay */}
        <div className='absolute top-0 left-0 w-full h-full bg-black/60 rounded-xl'>
         
          <div className='p-4 text-white'>
            <h1 className='text-2xl leading-[40px]'>{classRoom?.course}</h1>
            <h3 className='text-lg leading-[40px]'>{classRoom?.nameClass}</h3>
            <h5 className='text-sm font-semibold'>{classRoom?.teacherId?.fullname}</h5>
            <p className='text-xs font-bold'>{classRoom?.year}º</p>
          </div>
        </div>
        </div>

        <div className='my-4'>
          <div className='grid md:grid-cols-6'>
            <div className={`p-3 col-span-1 h-[150px] shadow-xl border border-[#ccc] rounded-xl`}>
              <h3 className='text-lg text-center font-bold mb-1'>Nexts activites</h3>
              <p className='text-sm text-center  md:text-justify'>Dont have new activites, click <span onClick={() => setPage('activites')} className='underline text-blue-500 cursor-pointer'>there</span> for create new activite</p>
            </div>

            <div className='col-span-5 h-[300px] px-2'>
              <button className={`my-4 md:my-0 text-white btn bg-black/60 w-[150px] rounded-2xl `}>
                New Job
                <Pencil className='size-5'/>
              </button>

              {classRoom?.material?.map((material) => (
                <a href={material?.materialName} target='_blank' className={`flex my-4 w-full h-[70px] rounded-xl bg-black/70 text-white p-2`}>
                <div className='flex items-center justify-center w-[10%] h-full'>
                  <div className='w-[50px] h-[50px] flex items-center justify-center shadow-xl bg-white border-[#ccc] rounded-full'>
                    <Book className='text-black'/>
                  </div>
                </div>
                
                <div className='w-[90%] px-2'>
                 <h3 className='text-sm'> <b>{classRoom?.teacherId?.fullname}</b> - {material?.description.slice(0,80)}.....</h3>
                 <p>{}</p>
                </div>

              </a>
              ))}
              
            </div>
          </div>
        </div>
       </>
     )}

     {page === 'activites' && (
        <>
        <h3 className='text-3xl font-bold border-b border-[#ccc] pb-5'>Create Activites</h3>

        <div>
            <form>
                <div className='form-control'>
                  <div className='label'>
                    <div className='label-text'>Title:</div>
                  </div>
                  <input type='text' 
                   placeholder='Goupt activite'
                   className='input input-bordered'
                   />
                </div>

                <div className='form-control'>
                  <div className='label'>
                    <div className='label-text'>Description:</div>
                  </div>
                  <textarea 
                   placeholder='Goupt activite'
                   className='textarea textarea-bordered h-[150px] resize-none'
                   ></textarea>
                </div>

                <div className='my-3'>
                 <button className='btn bg-secundary-color'>Create</button>
                </div>
            </form>
        </div>
        </>
     )}


     {page === 'people' && (
        <>
         <div className='w-full'>
            <div className='w-full'>
              <h3 className='text-3xl font-bold border-b border-[#ccc] pb-5'>Teacher's</h3>

              <div className='flex items-center gap-3 my-4'>
                <div className='avatar'>
                 <div className='image w-12 rounded-full'>
                   <img src={classRoom?.teacherId.profileImg || "/avatar.png"} 
                    className='w-full h-full bg-contain bg-no-repeat bg-center ring ring-secundary-color'
                   />
                 </div>
                </div>

                <div>
                    <h2 className='text-lg leading-nomal'>{classRoom.teacherId?.fullname}</h2>
                    <h4 className='text-xs'>{userName(classRoom?.teacherId?.email)}</h4>
                </div>
              </div>
            </div>

            <div className='my-10'>
              <h3 className='w-full flex items-center gap-3 text-3xl font-bold border-t border-[#ccc] pt-5'>Students <span className='text-center text-lg font-normal'>{myStudenstClass?.length}</span></h3>

              {Array.isArray(myStudenstClass) && myStudenstClass.map((student) => (
                <div className='flex items-center gap-3 my-4 mb-5'>
                <div className='avatar'>
                 <div className='image w-12 rounded-full'>
                   <img src={student?.profileImg || "/avatar.png"} 
                    className='w-full h-full bg-contain bg-no-repeat bg-center ring ring-secundary-color'
                   />
                 </div>
                </div>

                <div>
                    <h2 className='text-lg leading-nomal'>{student?.fullname}</h2>
                    <h4 className='text-xs'>{userName(student?.email)}</h4>
                </div>
              </div>
              ))}
              
              
            </div>
         </div>
        </>
     )}

        
    </div>
  )
}
