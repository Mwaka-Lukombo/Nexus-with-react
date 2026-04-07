import { Link, NavLink } from "react-router-dom";
import { authStore } from "../../store/authStotre";
import { Home, LogOut, MessageCircle, NetworkIcon, SchoolIcon, SquareChevronLeft, SquareChevronRight } from "lucide-react";

export const SideBar = ({
    userAuth,
    logout,
    sidebarWidth,
    setSidebarWidth
}) => {


  const handleSideBar = () => {
  setSidebarWidth(prev => (prev === 300 ? 80 : 300));
};

  
  const handleLogout = ()=>{
    logout();
    setSidebarWidth(prev => (prev && 80))
  }

  const navClass = ({ isActive }) =>
  `w-full h-[45px] flex ${sidebarWidth === 80 && "justify-center"} items-center gap-3 px-2 rounded-xl mb-3 transition
   ${isActive ? "bg-secundary-color text-white" : "hover:bg-secundary-color hover:text-white"}`;

  return (
    <div
    className="fixed top-0 left-0 shadow-xl h-screen  transition-all duration-300 "
    style={{ width: `${sidebarWidth}px` }}
    > 
      <div className="p-7 flex items-center gap-2 relative px-3">
        <img src="/assent/Logo.png" alt="logo" className="w-[50px] h-[50px]" />
        {sidebarWidth === 300 && <h3 className="text-xl font-bold">Nexus</h3>}

        <div className="absolute top-2 right-0 cursor-pointer" onClick={handleSideBar}>
            {sidebarWidth === 80 ? <SquareChevronRight className="size-7"/> : <SquareChevronLeft className="size-7"/>}
        </div>
      </div>

      
      <div className="px-3">
        <NavLink to="/" className={navClass}>
        <Home className="size-4" />
        {sidebarWidth === 300 && <span className="text-sm">Home</span>}
        </NavLink>

        <NavLink to="/campus" className={navClass}>
        <SchoolIcon className="size-4" />
        {sidebarWidth === 300 && <span className="text-sm">Campus</span>}
        </NavLink>

        <NavLink to="/message" className={navClass}>
        <MessageCircle className="size-4" />
        {sidebarWidth === 300 && <span className="text-sm">Message</span>}
        </NavLink>

        <NavLink to="/alumin" className={navClass}>
        <NetworkIcon className="size-4" />
        {sidebarWidth === 300 && <span className="text-sm">Alumin</span>}
        </NavLink>
      </div>

      
      
      <div className={`flex items-center ${sidebarWidth === 80 && "flex-col"} gap-3 w-full h-[100px] px-3 absolute bottom-16 `}>
        
        <div className={` ${userAuth?.fullname.split(" ").length > 2 && sidebarWidth == 300 && "w-[30px] h-[30px]"} ${sidebarWidth === 80 ? "w-[50px] h-[50px]" : "w-[70px] h-[70px]"} rounded-full border`}>
          <img src={userAuth?.profileImg || '/avatar.png'} 
          className="w-full h-full bg-cover bg-no-repeat bg-center rounded-full"
          />
        </div>
        
        {sidebarWidth === 300 && <span>{userAuth?.fullname}</span>}
        <button onClick={handleLogout} className="btn btn-md">
            <LogOut />
        </button>
      </div>
      
    </div>
  );
};