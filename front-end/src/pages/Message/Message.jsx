import { 
  Image,
  MessageCircle,
  MessageCircleCheck,
  MessageCircleCode,
  MessageSquare,
  Send,
  User,
  X
 } from 'lucide-react';

import {
  React,
  useState,
  useRef,
  useEffect
} from 'react';
import { messageStore } from '../../store/messageStore';
import { ChatSidebarSkeleton } from '../../components/skeletons/ChatSideBarSkeleton';
import { ChatMessagesSkeleton } from '../../components/skeletons/ChatMessageSkeleton';

export const Message = ({
  selectedUser,
  setSelectedUser,
  Friends,
  onlineUsers,
  userAuth,
  isMyFriend
}) => {

  const {
    getMessages,
    messages,
    createMessage,
    isMessaging
  } = messageStore();

  useEffect(()=>{
    getMessages(selectedUser?._id);
  },[selectedUser?._id]);

  
  useEffect(() => {
  if (boxScroll.current) {
    boxScroll.current.scrollIntoView({behavior:"smooth"});
  }
}, [messages]);



  
    
  const [imagePreview,setImagePreview] = useState(null);
   const [text,setText] = useState("");
    const [img,setImage] = useState("");
     const [id,setId] = useState(null);

     const boxScroll = useRef();
    


  const resetFrom = ()=>{
    setTitle("");
    setText("");
    setImagePreview("");
    setVideo("");
  }


  const handleMessage = (e)=>{
    e.preventDefault();

    const dataMessage = {
      text,
      img
    }
    createMessage(dataMessage,id);
    
    setText("");
    setImage(null)
  }

  const handleImageMessage = (e)=>{
     const file = e.target.files[0];

     const reader = new FileReader();
     reader.readAsDataURL(file);

     reader.onload = ()=>{
      const base64Image = reader.result;
      setImage(base64Image)
     }
  }


  
  if(isMessaging){
    return <ChatMessagesSkeleton />
  }

  
  
  return (
    <>
          <div className={`w-[80%] mx-auto my-[50px]  h-[450px] shadow-xl border border-[#ccc] rounded-2xl `}>
            <div className='flex'>
               <div className='w-[30%] min-h-[450px] border-r border-[#ccc] overflow-y-auto '>
                <div className='flex items-center px-3 w-full border-b border-[#ccc] h-[74px]'>
                  <div className='flex gap-3'>
                    <User className='size-7'/>
                    <span className='text-lg font-normal'>Contacto</span>
                  </div>
                </div>
                 <div className='w-full h-[306px] overflow-y-auto'>
                   {Friends.length === 0 && <div className='flex items-center justify-center p-4'>
                    <h2>Your dont have friends</h2>
                    </div>}
                    {Array.isArray(Friends) && Friends.map((friend) => (
                 <div onClick={()=>{
                  setSelectedUser(friend);
                  setId(friend._id)
                 }} className={`px-5 py-3 w-full h-auto transition-colors ${selectedUser?._id === friend._id && "bg-[#ccc]"}  flex items-center gap-3 cursor-pointer`}>
                   <div className='flex items-center justify-center w-[50px] h-[50px] rounded-full border relative'>
                     <img src={friend.profileImg || "/avatar.png"} 
                     className='w-full h-full bg-cover bg-center bg-no-repeat rounded-full'
                     />

                     {onlineUsers.includes(friend._id) && (
                      <div className='absolute top-0 right-0 w-[10px] h-[10px] bg-green-400 rounded-xl'></div>
                     )}
                   </div>
                   <div>
                      <h3 className='text-sm font-semibold'>{friend.fullname}</h3>
                      <p className='text-xs font-bold'>{friend.email}</p>
                   </div>
                 </div>
                ))}
                 </div>
               </div>

               <div className={`${!selectedUser && "flex items-center justify-center"} w-[70%]`}>
                  {!selectedUser ? <div className='bg-secundary-color rounded-xl flex items-center justify-center transition-all w-[70px] h-[70px] animate-bounce '>
                    <MessageSquare className='size-6 text-white animate-pulse' />
                  </div>
                : 
                <div>
                  <div className='flex items-center justify-between px-3 w-full h-[74px] border-b border-[#ccc]'>
                     <div className='flex items-center gap-3'>
                        <div className='avatar'>
                        <div className='w-12 h-12 rounded-full'>
                          <img src={selectedUser.profileImg || "/avatar.png"} 
                          alt={selectedUser.fullname}
                          className='w-full h-full bg-cover bg-center bg-no-repeat rounded-full'
                          />
                        </div>
                      </div>

                      <div>
                        <h3>{selectedUser.fullname}</h3>
                        <p className='text-xs font-semibold'>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                      </div>
                     </div>

                     <div onClick={()=> setSelectedUser(null)} className='w-[50px] h-[50px] flex items-center transition-colors justify-center rounded-full hover:bg-[#ccc] cursor-pointer hover:text-white'>
                       <X  />
                     </div>
                  </div>

                  <div className='w-full overflow-y-auto h-[315px] p-3 relative'>
                      {Array.isArray(messages) && messages.map((message) => (
                        <>
                          <div className={`chat ${message?.from === userAuth?._id ? "chat-end" : "chat-start"}`}>
                            <div className='chat-image avatar'>
                              <div className='w-10 rounded-full'>
                                <img 
                                 src={message?.from === userAuth?._id ? userAuth.profileImg : selectedUser.profileImg}
                                 alt='chat image'
                                />
                              </div>
                            </div>

                            <div className={`${message.img && "p-0"} chat-bubble ${message?.from === userAuth?._id  ? "bg-green-800 " : "bg-[#111]"} text-white`}>
                              {message.img && (
                                <div className='w-full h-full'>
                                <img src={message.img}
                                alt={message.img}
                                className='w-full h-full bg-cover bg-center bg-no-repeat rounded-t-xl mb-3'
                                />
                              </div>
                              )}
                              <span className={`px-3`}>{message.text}</span>
                            </div>
                          </div>
                        <div ref={boxScroll}></div>  
                        </>
                        
                      ))}
                      

                      
                  </div>
                      
                  <div className='relative'>
                    <form onSubmit={handleMessage} className='px-3'>
                    <div className='flex items-center gap-2'>
                      <input type="text" 
                      className='flex-1 input input-bordered'
                      placeholder='Write anything....'
                      onChange={(e)=> setText(e.target.value)}
                      value={text || ""}
                      />

                      <label className={`btn flex items-center ${img && "cursor-not-allowed"} justfy-center`}>
                          <input type="file" 
                          className='hidden'
                          accept='image/*'
                          onChange={handleImageMessage}
                          />
                          <Image />
                        
                      </label>
                      
                      <button className='btn btn-circle'>
                        <Send />
                      </button>
                    </div>
                  </form>

                  {img && (
                    <div className='absolute top-[-210px] left-2 w-[200px] h-[200px] bg-white shadow border border-[#ccc] rounded-xl'>
                     <div onClick={()=> setImage("")} className='flex items-center justify-center absolute top-[-12px] right-[-12px] w-[20px] h-[20px] bg-white shadow border border-[#ccc] rounded-full cursor-pointer'>
                        <X />
                     </div>
                     <img 
                     src={img}
                     alt={img}
                     className='w-full h-full bg-cover bg-no-repeat bg-center rounded-xl'
                     />
                  </div>
                  )}
                  </div>
                </div>  
                }
               </div>


            </div>
          </div>
        </>

  )
}
