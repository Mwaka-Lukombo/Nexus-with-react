import { Bell, Book, Heart, MessageSquare, Settings, User, X } from 'lucide-react'
import 
React, 
{ 
  useEffect, 
  useState,
  useRef 
} from 'react'
import { campusStore } from '../../store/campuStore'

export const Header = () => {

  const {
    setTheme,
    getNotifications,
    notifications,
    readNotification,
    deleteNotifications
  } = campusStore();

   const [theme,setThemeColor] = useState("dark");
     const sideBarNotifications = useRef();


  const handleTheme = ()=>{
    setThemeColor((prev => (prev === "light" ? "dark" : "light")));
    setTheme(theme);
  }

  useEffect(()=>{
    getNotifications();
  },[getNotifications])


  const handleSideBarNotification = ()=>{
    if(notifications.length === 0) return;
    sideBarNotifications.current.classList.toggle('hidden')
  }



  return (
    <>

    {/* side Notifications */}

    <div ref={sideBarNotifications} className={`hidden transition-all border-l-2 border-[#ccc] fixed top-0 right-0 w-full md:w-[400px] h-screen bg-white shadow-2xl z-50`}>
      <div className='p-3'>
        <div onClick={()=>{
          handleSideBarNotification();
          deleteNotifications();
        }} className='w-[40px] h-[40px] bg-[#ccc] hover:bg-[#cccc] rounded-full flex items-center justify-center cursor-pointer'>
          <X />
        </div>
      </div>

      <div className='p-2'>
        <h2 className='text-xl font-bold leading-normal'>See your notifications</h2>
        <p  className='text-sm font-normal'>In 7 days all notifications as been deleted</p>
      </div>
      <div className='my-4 w-full h-[500px] overflow-y-auto'>
           {Array.isArray(notifications) && notifications.map((notification) => (
            <div className='flex items-center  gap-2 w-full p-2 h-[70px] border-t border-b border-[#ccc]'>
             
             
             <div className='avatar'>
               <div className='w-12 rounded-full ring-2 ring-secundary-color'>
                 <div className='image'>
                    <img src={`${notification.from.profileImg || "/avatar.png"}`} 
                    className='w-full h-full bg-cover bg-no-repeat bg-center'
                  />
                 </div>
               </div>
             </div>

             <div className=' justify-center items-center'>
               <h3 className='text-sm font-normal'>{notification.from.fullname}</h3>
              <p className=' gap-2 text-xs font-bold'>
                {notification.typeNotification === "liked" && <span>Liked your photo <Heart className='size-3 text-red-500' /></span>}
                {notification.typeNotification === "friend request" && <span>Friend request <User className='size-3 text-red-500' /></span>}
                {notification.typeNotification === "message" && <span>Send Message <MessageSquare className='size-3 text-gray-500' /></span>}
                {notification.typeNotification === "classRoom" && <span>Posted in class <Book className='size-3 text-red-500' /></span>}
              </p>
             </div>


             
           </div>
           ))}
      </div>

    </div>
    
      {/* Header */}
      <div className='px-5 flex items-center justify-end w-full min-h-[70px] border border-[#cccc] rounded-xl mb-5 shadow-md'>
        <div className='flex items-center gap-4'>

          <div onClick={()=>{
            handleSideBarNotification();
            readNotification();
          }} className='w-[40px] h-[40px] flex items-center justify-center relative cursor-pointer transition hover:bg-[#ccc] rounded-xl'>
            <Bell size={20} />
            <div className='w-[15px] h-[15px] rounded-full bg-secundary-color absolute top-0 right-0'>
              <span className='text-[10px] text-white flex items-center justify-center font-bold cur'>
                {notifications.length}
              </span>
            </div>
          </div>

          <label className="grid cursor-pointer place-items-center" onChange={handleTheme}>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              
            >
              <circle cx="12" cy="12" r="5" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              onSelect={true}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3" />
            </svg>
          </label>

        </div>
      </div>
    </>
  )
}
