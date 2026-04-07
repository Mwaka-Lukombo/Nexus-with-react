import { 
  Heart, 
  LucideBookmark, 
  MessageCircle, 
  Send, 
  User 

} from 'lucide-react'
import 
  React, { 
  useEffect, 
  useState 

} from 'react'

import { 
  aluminStore
 } from '../../store/aluminStore';

import {
  timeAgo
} from '../../utils/formateTime';
import { authStore } from '../../store/authStotre';
import { AluminSkeleton } from '../../components/skeletons/AluminSkeleton';
import { MyPlayer } from '../../components/lib/MyPlayer';

export const Alumin = () => {
  const [aluminPage,setAluminPage] = useState("forYour");
    const [comment,setComment] = useState("");
     const [id, setId] = useState(null);

        const {
          isNotice,
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


        const {
          userAuth
        } = authStore();

  useEffect(()=>{
    getNotices();
  },[getNotices]);

  useEffect(()=>{
    getMyStoreds();
  },[getMyStoreds,stored])

  const handleComment = (e)=>{
     e.preventDefault();
     createComment({comment},id)

     
     setComment("");
  }




  const studentParameters = userAuth?.studentParameters;

  if(isNotice){
    return <AluminSkeleton />
  }

  return (
    <>
         <div className='p-3'>
            <div className='mb-20  md:mb-0 max-w-[1000px] h-[40px] mx-auto border-b border-[#ccc]'>
              <div className='grid md:grid-cols-3'>
                 <div onClick={()=> setAluminPage("forYour")} className={`flex items-center justify-center col-span-1 h-[40px] ${aluminPage === "forYour" && "bg-secundary-color/70 text-white"}  cursor-pointer`}>
                   <span className={`text-[#111] ${aluminPage === "forYour" && "text-white"} font-bold`}>For your</span>
                 </div>

                 <div onClick={()=> setAluminPage("followers")} className={`flex items-center justify-center col-span-1 h-[40px] ${aluminPage === "followers" && "bg-secundary-color/70 text-white"} cursor-pointer`}>
                   <span className={`text-[#111] ${aluminPage === "followers" && "text-white"} font-bold`}>Your followers</span>
                 </div>

                 <div onClick={()=> setAluminPage("connect")} className={`flex items-center justify-center col-span-1 h-[40px] ${aluminPage === "connect" && "bg-secundary-color/70 text-white"} cursor-pointer`}>
                   <span className={`text-[#111] ${aluminPage === "connect" && "text-white"} font-bold`}>Connect</span>
                 </div>
              </div>
            </div>
         </div>

          {aluminPage === "forYour" && (
            <>
             {notices.map((post) => (
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

          {aluminPage === "followers" && (
            <>
             {post2.map((post) => (
              <div className='my-4 w-[100%] md:w-[50%] h-[700px] border border-[#ccc] shadow-xl rounded-xl mx-auto'>
                <div className='p-2 flex items-center  gap-3'>
                   <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full border border-[#ccc]'>
                      <User />
                   </div>

                   <div>
                      <h3 className='text-sm font-normal'>{post.username}</h3>
                      <p className='text-xs font-bold'>Old student</p>
                   </div>

                   <div>
                     <h3 className='text-sm text-[#ccc]'>12 min</h3>
                     <span className='text-transparent'>a</span>
                   </div>
                </div>

                <div className='w-full h-[85%]'>
                  <img src={post.image}  
                  className='w-full h-full bg-cover bg-center bg-no-repeat'
                  />
                </div>

                <div className='w-full h-[5%] flex items-center gap-3 px-3'>
                  <div className='flex items-center'>
                    <Heart />
                    <span className='px-1'>13</span>
                  </div>
                  <div className='flex items-center'>
                   <MessageCircle />
                   <span className='px-1'>54</span>
                  </div>
                </div>
              </div>
             ))}

             
            </>
          )}

          {aluminPage === "connect" && (
            <div className='w-full px-[50px]'>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <Link
            to={`/profile/${user.id}`}
            key={user.id}
            className="block"
          >
            <div className="bg-white border border-[rgb(114,16,17)] rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl transition relative">
              
              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[rgb(114,16,17)] mb-3"
              />

              {/* Nome */}
              <h2 className="text-lg font-semibold text-[rgb(114,16,17)]">
                {user.name}
              </h2>

              {/* Curso */}
              <p className="text-sm text-gray-600 mb-4">
                {user.course}
              </p>

              {/* Botão Follow */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // impede navegação do Link
                  toggleFollow(user.id);
                }}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  user.isFollowing
                    ? "bg-gray-200 text-gray-700"
                    : "bg-[rgb(114,16,17)] text-white hover:bg-[rgb(140,25,26)]"
                }`}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </Link>
        ))}
      </div>
            </div>
          )}
       </>

  )
}
