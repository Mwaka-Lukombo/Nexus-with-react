import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Hand,
  Home,
  LogOut,
  MessageCircle,
  NetworkIcon,
  SchoolIcon,
  SquareChevronLeft,
  SquareChevronRight,
  UserCheck,
  UserCogIcon,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Newspaper,
  Presentation,
  GraduationCap,
} from "lucide-react";

export const SideBar = ({
  userAuth,
  logout,
  sidebarWidth,
  setSidebarWidth,
}) => {
  const isCollapsed = sidebarWidth <= 80;

  const [openAlumni, setOpenAlumni] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openForum, setOpenForum] = useState(false);

  const handleSideBar = () => {
    setSidebarWidth((prev) => {
      const newWidth = prev <= 80 ? 280 : 80;

      
      if (newWidth === 80) {
        setOpenAlumni(false);
        setOpenTeacher(false);
        setOpenForum(false);
      }

      return newWidth;
    });
  };

  const handleLogout = () => {
    logout();
    setSidebarWidth(80);
  };

  const navClass = ({ isActive }) =>
    `flex items-center ${
      isCollapsed ? "justify-center" : "gap-3"
    } px-3 py-2 text-sm rounded-xl transition-all
     ${
       isActive
         ? "bg-secundary-color text-white"
         : "text-gray-600 hover:bg-secundary-color hover:text-white"
     }`;

  return (
    <aside
      className="fixed top-0 left-0 h-screen shadow-xl flex flex-col border-r border-[#ccc] "
      style={{ width: sidebarWidth }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-4">
        <div className="flex items-center gap-2">
          <img src="/assent/Logo.png" className="w-10 h-10" />
          {!isCollapsed && <h3 className="font-bold text-lg">Nexus</h3>}
        </div>

        <button onClick={handleSideBar}>
          {isCollapsed ? <SquareChevronRight /> : <SquareChevronLeft />}
        </button>
      </div>

      {/* NAV */}
      <div className="my-5 flex-1 overflow-y-auto px-2 space-y-2">
        <NavLink to="/" className={navClass}>
          <Home size={18} />
          {!isCollapsed && <span>Home</span>}
        </NavLink>

        <NavLink to="/campus" className={navClass}>
          <SchoolIcon size={18} />
          {!isCollapsed && <span>Campus</span>}
        </NavLink>

        <NavLink to="/message" className={navClass}>
          <MessageCircle size={18} />
          {!isCollapsed && <span>Messages</span>}
        </NavLink>

        {/* ================= ALUMNI ================= */}
        {!isCollapsed && (
          <button
            onClick={() => setOpenAlumni(!openAlumni)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400"
          >
            ALUMNI {openAlumni ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}

        
        {openAlumni &&  (
          <div className="ml-3 space-y-1">
            <NavLink to="/alumin" className={navClass}>
              <Newspaper size={16} />
              {!isCollapsed && <span>Home</span>}
            </NavLink>
            
            {userAuth.typeUser === "old student" && (
              <>
               <NavLink to="/createAlumin" className={navClass}>
              <Hand size={16} />
              {!isCollapsed && <span>Create</span>}
            </NavLink>

            <NavLink to="/oldAlumin" className={navClass}>
              <UserCheck size={16} />
              {!isCollapsed && <span>Profile</span>}
            </NavLink>
              </>
            )}
          </div>
        )}

        {/* ================= Turmas ================= */}
        
          <>
            {!isCollapsed && (
              <button
                onClick={() => setOpenTeacher(!openTeacher)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400"
              >
                TURMAS{" "}
                {openTeacher ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}

            {openTeacher && (
              <div className="ml-3 space-y-1">

                {userAuth?.typeUser === 'student' && (
                  <NavLink to="/classes" className={navClass}>
                  <GraduationCap size={16} />
                  {!isCollapsed && <span>Class</span>}
                </NavLink>
                )}
                
                {userAuth?.typeUser === 'teacher' && (
                  <>
                   <NavLink to="/createClass" className={navClass}>
                  <BookOpen size={16} />
                  {!isCollapsed && <span>Create Class</span>}
                </NavLink>

                <NavLink to="/myClasses" className={navClass}>
                  <SchoolIcon size={16} />
                  {!isCollapsed && <span>My Classes</span>}
                </NavLink>
                  </>
                )}
              </div>
            )}
          </>
        

        {/* ================= FORUM ================= */}
        {!isCollapsed && (
          <button
            onClick={() => setOpenForum(!openForum)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-400"
          >
            FORUM {openForum ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}

        {openForum && (
          <div className="ml-3 space-y-1">
            <NavLink to="/forum" className={navClass}>
              <MessageCircle size={16} />
              {!isCollapsed && <span>All Topics</span>}
            </NavLink>

            {userAuth?.typeUser !== "student" && (
              <NavLink to="/forum/create" className={navClass}>
              <Hand size={16} />
              {!isCollapsed && <span>Create Topic</span>}
            </NavLink>
            )}
          </div>
        )}

        {/* ================= ADMIN ================= */}
        {userAuth?.email === "alphonse@gmail.com" && (
          <>
            {!isCollapsed && (
              <p className="text-xs text-gray-400 mt-4 px-2">ADMIN</p>
            )}
            <NavLink to="/createUser" className={navClass}>
              <UserCogIcon size={18} />
              {!isCollapsed && <span>Users</span>}
            </NavLink>
          </>
        )}
      </div>

      {/* FOOTER */}
      <Link to={'/profile'} className="border-t p-3 flex items-center gap-3">
        <img
          src={userAuth?.profileImg || "/avatar.png"}
          className={`rounded-full ${
            isCollapsed ? "w-10 h-10 mx-auto" : "w-12 h-12"
          }`}
        />

        {!isCollapsed && (
          <div className="flex-1">
            <p className="text-sm font-medium">{userAuth?.fullname}</p>
          </div>
        )}

        <button onClick={handleLogout}>
          <LogOut />
        </button>
      </Link>
    </aside>
  );
};