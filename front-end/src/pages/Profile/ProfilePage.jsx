import {
  useState,
  useEffect
} from 'react'
import { authStore } from '../../store/authStotre';
import { 
  Camera, 
  Heart, 
  LucideBookmark, 
  MessageCircle, 
  User, 
  Send,
  Loader
} from 'lucide-react';


import { campusStore } from '../../store/campuStore';
import { aluminStore } from '../../store/aluminStore';
import { timeAgo } from '../../utils/formateTime';
import { MyPlayer } from '../../components/lib/MyPlayer';

export const ProfilePage = () => {
  const [page, setPage] = useState("profile");
   const [image, setImage] = useState(null);
    const [comment,setComment] = useState("");
     const [formData, setFormData] = useState({
      course:"",
      year:"",
      password:""
     })

  const {
    userAuth,
    updatePorfile,
    isUpdateding
  } = authStore();


  const {
    getNotices,
    notices,
    like,
    comments,
    getComments,
    stored,
    createComment,
    myStoreds,
    getMyStoreds
  } = aluminStore();

  useEffect(()=>{
    getNotices();
  },[getNotices])

  useEffect(()=>{
    getMyStoreds();
  },[getMyStoreds])

  

  const resetForm = ()=>{
    setFormData((prev) => ({
      ...prev,
      course:"",
      year:"",
      password:""
    }))
    setImage(null);
  }

    const handleSubmit = (e)=>{
    e.preventDefault();

    const {
      course,
      year,
      password
    } = formData;

    const updateData = {
      course,
      year,
      password,
      profileImage:image
    }

    console.log(updateData)
    updatePorfile(updateData);
    resetForm();
  }


  const handleImage = (e)=>{
    const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async ()=>{
        const base64Image = reader.result;
        setImage(base64Image);
      }
  }

  const handleComment = (e)=>{
     e.preventDefault();
     createComment({comment},id)

     
     setComment("");
  }


  
  const myStored = notices.filter(prev => userAuth?.studentParameters?.noticeStored?.includes(prev?._id));
  
  return (
    <div className='p-2'>
      <div className='grid md:grid-cols-2'>
        <div onClick={()=> setPage("profile")} className={`transition-all duration-300 col-span-1 h-[40px] cursor-pointer text-black ${page === 'profile' && "bg-secundary-color text-white"} flex items-center justify-center`}>
           <span>My Profile</span>
        </div>

        <div onClick={()=> setPage("storedPage")} className={`transition-all duration-300 h-[40px] cursor-pointer col-span-1 flex items-center justify-center ${page === 'storedPage' && "bg-secundary-color text-white"}`}>
           <span>My Stored</span>
        </div>
      </div>



      <div className='my-7'>
        {page === 'profile' && (
          <>
            <div className='max-w-[700px] mx-auto shadow-xl border border-[#ccc] rounded-xl px-2'>                
              
              <form onSubmit={handleSubmit} className='p-2'>

                <div className='flex items-center justify-center'>
                  <div className='relative w-[90px] h-[90px]  flex items-center justify-center rounded-full'>
                  <img src={userAuth.profileImg || image || "/user.png"} 
                  className={`${userAuth?.profileImg && "w-full h-full"} w-[70px] h-[70px] bg-contain bg-center bg-no-repeat rounded-full ring-2`}
                  />

                  <label disabled={isUpdateding} className={`${isUpdateding && "bg-black/80 animate-pulse"} absolute bottom-0 right-0 w-[30px] h-[30px] bg-secundary-color text-white flex items-center justify-center rounded-full cursor-pointer`}>
                    <input type="file" 
                    accept='image/*'
                    className='hidden'
                    onChange={(e)=> handleImage(e)}
                    />
                    <Camera className='size-5' />
                  </label>
                  
                </div>
                </div>
                 
                 {userAuth?.typeUser === 'student' ? (
                  <>

                  <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Course:</div>
                  </div>

                  <input type="text"  
                   placeholder='Engenharia informatica'
                   value={userAuth?.course || "" || formData.course}
                  className='input input-bordered'
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    course: e.target.value
                  }))}
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Year:</div>
                  </div>

                  <input type="text"  
                   placeholder='Engenharia informatica'
                   value={userAuth?.year || "" || formData.year}
                  className='input input-bordered'
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    year:e.target.value
                  }))}
                  />
                 </div>

                 

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Password:</div>
                  </div>

                  <input type="text"  
                   placeholder='*****'
                  className='input input-bordered'
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    password:e.target.value
                  }))}
                  value={formData.password || ""}
                  />
                 </div>
                  </>
                 ) : 
                 <>
                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Fullname:</div>
                  </div>

                  <input type="text"  
                  disabled
                  value={userAuth?.fullname}
                  className='input input-bordered'
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Email:</div>
                  </div>

                  <input type="text"  
                  disabled
                  value={userAuth?.email}
                  className='input input-bordered'
                  />
                 </div>

                 <div className='form-control'>
                   <div className='label'>
                   <div className="label-text">Password:</div>
                  </div>

                  <input type="text"  
                  placeholder='*****'
                  className='input input-bordered'
                  />
                 </div>
                 </>
                 }

                 <button disabled={isUpdateding} className='my-5 btn bg-secundary-color text-white hover:bg-hover'>
                  {!isUpdateding ? "Update" : <div className='flex items-center justify-center'>
                   <Loader className='size-5 animate-spin' />  
                  </div>}
                 </button>
              </form>
            </div>
          </>
        )}

        {page === 'storedPage' && (
          <>
          {myStored?.length === 0 && <div className='flex items-center justify-center'>You dont have notice stored</div>}
           {Array.isArray(myStored) && myStored?.map((post)=> (
             <div className='my-4  w-[100%] md:w-[50%] h-[1000px]  rounded-xl mx-auto'>
                <div className='p-2 flex items-center  gap-3 h-[7%]'>
                   <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full border border-[#ccc]'>
                      {/* profile */}
                      {post.userId.profileImg && (
                        <img src={post.userId.profileImg || "/avatar.png"} 
                        className='w-full h-full rounded-full'
                        />
                      )}
                   </div>

                   <div>
                      <h3 className='text-sm font-normal'>{post.userId.fullname}</h3>
                      <p className='text-xs font-bold'>{post.userId.email}</p>
                   </div>

                   <div>
                     <h3 className='text-sm text-black font-bold'>{timeAgo(post.createdAt)}</h3>
                     <span className='text-transparent'>a</span>
                   </div>
                </div>

                <div className={`w-full h-[80%] ${post.img && "border border-[#ccc]"}`}>
                  {post.img && (
                    <img src={post.img}  
                  className='w-full h-full bg-cover bg-center bg-no-repeat'
                  />
                  )}
                  {post.video && (
                    <MyPlayer src={post.video}  />
                  )}
                </div>

                <div className='w-full h-[5%] flex items-center justify-between gap-3 px-3'>

                  {/* Comment modal */}
                  <dialog id={`modal_${post._id}`} className="modal">
                    <div className="modal-box w-[500px] p-0">
                      
                      {/* Aqui 3 */}
                      <div className='w-full h-[300px] border-b  border-[#ccc] overflow-y-auto'>

                    
                        
                         {Array.isArray(comments) && comments.map((comment) => (
                          <div className='p-2 flex items-center gap-3 w-[80%] relative'>
                           <div className='avatar border border-[#ccc] rounded-full'>
                             <div className='w-10 rounded-full'>
                                <img src={comment.userId?.profileImg || "/avatar.png"}  
                                alt={post.title}
                                />
                             </div>
                           </div>

                           <div>
                             <h3 className='text-sm font-semibold'>{comment.userId?.fullname}</h3>
                             <p className='text-xs'>{comment?.comment}</p>
                           </div>

                            {/* deleteComment */}
                           {/* <div className='absolute top-2 right-2 w-[40px] h-[40px] flex items-center rounded-full cursor-pointer justify-center transition-all hover:bg-[#ccc]'>
                             <Trash className='text-red-500' />
                           </div> */}
                         </div>
                         ))}
                      </div>

                      <form onSubmit={handleComment} method="dialog" className='flex gap-2 p-3'>
                      
                          <input type="text" 
                          className='flex-1 input input-bordered'
                          placeholder='Comment anything'
                          onChange={(e)=> setComment(e.target.value)}
                          value={comment || ""}
                          />

                        <button className=' btn btn-md bg-secundary-color text-white hover:bg-hover'><Send /></button>
                      </form>
                      

                    </div>
                  </dialog>
                   
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center cursor-pointer'>
                    <Heart onClick={()=> like(post?._id)} className={`transition ${post.likes?.includes(userAuth?._id) && "text-red-600"} hover:text-red-600`} />
                    <span className='px-1'>{post.likes?.length}</span>
                  </div>
                  <div className='flex items-center cursor-pointer'>
                   <MessageCircle 
                   onClick={() => {
                    document.getElementById(`modal_${post?._id}`).showModal()
                    getComments(post?._id)
                    setId(post?._id)
                   }}
                   className='hover:text-hover' />
                   <span className='px-1'>{post.comments?.length}</span>
                  </div>
                  </div>

                  <div className='flex items-center justify-center'>
                    {/* Aqui2 */}
                    <LucideBookmark onClick={()=> stored(post?._id)} className={`cursor-pointer ${myStoreds.includes(post._id) && "text-green-500"} hover:text-green-300`} />
                  </div>
                </div>

                <div className='w-full h-[7%]'>
                  <p >{post.text} <span className='text-xs underline text-gray-400 cursor-pointer'>Read more</span> </p>
                </div>
              </div>
           ))}
          </>
        )}
      </div>    
    </div>
  )
}
