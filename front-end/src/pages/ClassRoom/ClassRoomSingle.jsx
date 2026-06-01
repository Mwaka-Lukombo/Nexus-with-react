import React, { useEffect, useState, useRef } from 'react'
import { BannerClass } from '../../components/common/BannerClass'
import { classStore } from '../../store/classStore';
import { useParams } from 'react-router-dom';
import {
    Book,
    BookAIcon,
    BookmarkIcon,
    Download,
    Loader,
    Pencil,
    Trash,
    Video,
    X
} from 'lucide-react';
import { campusStore } from '../../store/campuStore';
import { authStore } from '../../store/authStotre';
import {
  MyPlayer
} from '../../components/lib/MyPlayer';

export const ClassRoomSingle = () => {
    const [page, setPage] = useState("mural");
    const [type, setType] = useState("");
    const [file,setFile] = useState(null);
    const [video,setVideo] = useState(null);
    const [form, setFormData] = useState({
        nameClass:"",
        course:"",
        year:"",
        description:""
       })
       const [typeOverlay, setTypeOverlay] = useState("createJob");
       const [contentLarning, setContentLearning] = useState({
        typeFile:"",
        url:"",
        description:""
       })

    const {id} = useParams();
    

    const {
        getClassSingle,
        classRoom,
        getStudents,
        students,
        isCreateWork,
        createWork,
        deleteWordk
    } = classStore();

    const {
      userAuth
    } = authStore();



    useEffect(()=>{
     getClassSingle(id);
    },[getClassSingle,id]);

    useEffect(()=>{
     getStudents();
    },[getStudents,id]);




    
let myStudenstClass = []; 

if(userAuth?.typeUser === 'teacher'){
  myStudenstClass = students.filter((prev) => 
    prev?.course === classRoom?.course && Number(prev?.year) === classRoom?.year 
  )
}else{
  myStudenstClass = students.filter((prev) => 
    prev?.course === classRoom?.course && Number(prev?.year) === classRoom?.year 
    && prev?._id !== userAuth?._id
  )
}


const userName = (email) => {
    const [name, domain] = email.split("@");
      const realName = name[0].toUpperCase() + name.slice(1,3);

      return realName.padEnd(realName.length + 3, '*') + domain.padStart(domain.length + 1,"@");
}

function readerFile(file,setFunc){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onload = ()=>{
      const base64File = reader.result;
      setFunc(base64File);
    }
  }

   const handleFile = (e)=>{
    const file = e.target.files[0];
    if(file.type === 'image/jpeg' || file.type === 'image/png'
      || file.type === 'image/jpg' || file.type === 'image/webp'
      || file.type === 'image/avif'
    ){
      //Banner Uploader
      readerFile(file,setBannerClass);
    }else if(file.type === 'application/pdf'){
      //Pdf 
      setFile(file)
    }else{
      //Video
      readerFile(file,setVideo);
    }
   }

   const resetForm = ()=>{
     setFormData((prev)=> ({
      ...prev,
      nameClass:"",
      course:"",
      year:"",
      description:""
     }));

     setBannerClass(null);
     setVideo(null);
     setFile(bull);
   }

   const handleSumbit = (e)=>{
     e.preventDefault();

     const {
      nameClass,
      course,
      year,
      description
     } = form;

     const newClass = {
      nameClass,
      course,
      year,
      description,
      video,
      file,
      bannerClass
     }

     createClass(newClass);
     resetForm();
   }


  const showFormDjob = useRef();

  const handleShowForm = ()=>{
  showFormDjob?.current?.classList.toggle('hidden');
  
  }

  const handleWork = (e)=>{
    e.preventDefault();

    const {description} = form
    createWork(id,{description,file,video});
    resetForm();
  }


  const handleDelete = (materialId)=>{
     deleteWordk(id,materialId);
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

       <div ref={showFormDjob} className='hidden fixed transition duration-300 top-0 left-0 w-full h-full bg-black/80 z-20 p-2'>
         <div onClick={handleShowForm} className='flex items-center justify-center w-[50px] h-[50px] bg-gray/80 transition hover:bg-gray/90 cursor-pointer shadow-xl rounded-full
         absolute right-5 top-5
         '>
           <X className='text-white'/>
         </div>

          {typeOverlay === 'createJob'  ? (  
         <div className='my-36 p-4 py-8 rounded-xl max-w-[700px] w-[95%] md:h-[350px] mx-auto  bg-white'>
          <form onSubmit={handleWork}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Tipo */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">Tipo de Upload</label>
                <select onChange={(e) => setType(e.target.value)} className="select select-bordered w-full">
                  <option disabled selected>Selecionar tipo</option>
                  <option value="video">Vídeo</option>
                  <option value="file">Arquivo</option>
                </select>
              </div>

      {/* Arquivo */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Upload</label>
            <input
              type="file"
              accept={type === "video" ? "video/*" : "application/pdf"}
              className="file-input file-input-bordered w-full"
              onChange={handleFile}
            />
          </div>

        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Descrição</label>
          <textarea
            rows="4"
            placeholder="Descreva a turma..."
            className="textarea textarea-bordered w-full resize-none"
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              description:e.target.value
            }))}
            value={form.description || ""}
          ></textarea>
        </div>
          
          <div className='my-3'>
             <button disabled={isCreateWork} className="btn bg-secundary-color text-white transition-colors hover:bg-hover">
              {!isCreateWork ? "Plublic" : <div><Loader className='size-5 animate-spin' /></div>}
             </button>
          </div>
        </form>
          
         </div>
          ): (
            <div className='flex w-[90%] mx-auto h-[450px] bg-white my-20 rounded-[32px] border border-[#ccc]'>
               {contentLarning.typeFile === 'video' && (
                <>
                <div className='w-[70%] h-full relative'>
                 <MyPlayer src={contentLarning?.url} className="absolute left-0"  />
                </div>

                <div className='w-[30%] h-full p-3 rounded-tr-[30px] rounded-br-[30px]'>
                  <h2 className='text-2xl font-bold leading-normal'>Leacture Description</h2>
                  <p className='text-sm text-justify leading-[25px] '>{contentLarning?.description}</p>
                  
                  <a className='btn transition duration-300 bg-secundary-color hover:bg-hover' href={contentLarning.url} download={contentLarning.url} target='_blank'>
                    <Download className='size-5 text-white' />
                  </a>
                </div>  
                </>
               )}
            </div>  
          )}         
         
       </div>
       
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

            <div className='col-span-5 h-[300px] px-2 '>
             {userAuth?.typeUser === 'teacher' && (
              <button onClick={()=> {
                handleShowForm();
                setTypeOverlay('createJob');
              }} className={`my-4  md:my-0 text-white btn bg-black/60 w-[150px] rounded-2xl `}>
                New Job
                <Pencil className='size-5'/>
              </button>
             )}

              {classRoom?.material?.map((material) => (
                <>
                  <div className='flex items-center w-full h-[4rem] my-5 shadow-xl border border-[#ccc] rounded-2xl'>
                    <div onClick={()=> {
                      setContentLearning((prev)=> ({
                      ...prev,
                      description:material?.description,
                      typeFile:material?.type,
                      url:material.materialName
                    }))
                    handleShowForm();
                    setTypeOverlay('learning');
                    }} className='cursor-pointer transition-all hover:bg-hover flex items-center justify-center w-[10%] h-full bg-secundary-color border rounded-tl-xl rounded-bl-xl'>
                      {material?.type === "file" ? <Book className='text-white' /> :
                       <Video className='text-white' />
                      }
                    </div>

                    <div className='w-[90%] h-full flex flex-col justify-center px-2 rounded-tr-xl rounded-br-xl'>
                        <h2 className='text-sm font-bold'>{classRoom?.teacherId?.fullname}</h2>
                        <p className='text-sm font-normal'>{material?.description.slice(0,100)}....</p>
                    </div>
                    
                    {userAuth?.typeUser === 'teacher' && (
                      <div className='px-3'>
                        <button onClick={()=> handleDelete(material?._id)} className='btn bg-error hover:bg-red-400'>
                          <Trash className='size-5 text-white' />
                        </button>
                    </div>
                    )}
                  
                  </div>
                </>
              ))}
              
            </div>
          </div>
        </div>
       </>
     )}

     {page === 'activites' && (
        <>
         {userAuth?.typeUser === 'teacher' && (
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
              <h3 className='w-full flex items-center gap-3 text-3xl font-bold border-t border-[#ccc] pt-5'>{userAuth?.typeUser === 'teacher' ? "Students" : "Class Mates"} <span className='text-center text-lg font-normal'>{myStudenstClass?.length}</span></h3>

              {Array.isArray(myStudenstClass) && myStudenstClass.map((student) => (
                <div key={student?._id} className='flex items-center gap-3 my-4 mb-5'>
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
