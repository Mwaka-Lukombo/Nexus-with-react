import {
  Bell,
  MessageSquare,
  NewspaperIcon,
  Handshake,
  X
} from 'lucide-react';

import React, { useEffect, useState } from 'react';

import { campusStore } from '../../store/campuStore';
import { authStore } from '../../store/authStotre';

export const Header = () => {
  const {
    setTheme,
    getNotifications,
    notifications,
    readNotification,
    deleteNotification,
    deleteNotifications
  } = campusStore();

  const { userAuth } = authStore();

  const [theme, setThemeColor] = useState("light");
  const [openSidebar, setOpenSidebar] = useState(false);

  
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setThemeColor(newTheme);
    setTheme(newTheme);
  };

  

  useEffect(() => {
    getNotifications();
  }, []);

  
  const getIcon = (type) => {
    switch (type) {
      case 'post':
        return <NewspaperIcon className="size-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="size-4 text-green-500" />;
      case 'friend request':
        return <Handshake className="size-4 text-orange-500" />;
      default:
        return <Bell className="size-4" />;
    }
  };

  return (
    <>
      {/* SIDEBAR */}
      <div className={`
        fixed top-0 right-0 h-screen bg-white z-50 shadow-2xl
        transition-transform duration-300
        ${openSidebar ? 'translate-x-0' : 'translate-x-full'}
        w-full sm:w-[380px]
      `}>
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-[#ccc]">
          <button
            onClick={() => setOpenSidebar(false)}
            className="p-2 hover:bg-[#ccc] rounded-full"
          >
            <X />
          </button>

          <span onClick={()=> {
            deleteNotifications();
          }} className="text-sm text-blue-500 cursor-pointer hover:underline">
            Marcar todas como lidas
          </span>
        </div>

        {/* LIST */}
        <div className="overflow-y-auto h-[calc(100%-70px)]">

          {notifications?.length === 0 && (
            <p className="text-center mt-10 text-gray-500">
              Sem notificações
            </p>
          )}

          {notifications?.map((notify) => (
            <div
              key={notify._id}
              className="flex items-start gap-3 p-3 border-[#ccc] hover:bg-gray-100 transition"
            >
              {/* CHECK */}
              <input
                type="checkbox"
                onChange={() => {
                  readNotification(notify?._id);
                  deleteNotification(notify?._id)
                }}
                className="mt-2"
              />

              {/* AVATAR */}
              <img
                src={notify?.from?.profileImg || '/avatar.png'}
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">
                    {notify?.from?.fullname?.split(" ")[0]}
                  </h3>
                  {getIcon(notify?.typeNotification)}
                </div>

                <p className="text-sm text-gray-600">
                  <b>{notify?.title}</b> — {notify?.text?.slice(0, 70)}...
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      
      <div className="px-5 flex items-center justify-end w-full min-h-[70px] border rounded-xl mb-5 shadow-md">
        
        <div className="flex items-center gap-4">

          
          <div
            onClick={() => setOpenSidebar(true)}
            className="relative w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-xl"
          >
            <Bell size={20} />

            {notifications?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>

          
          <input
            type="checkbox"
            onChange={handleTheme}
            className="toggle"
          />

        </div>
      </div>
    </>
  );
};