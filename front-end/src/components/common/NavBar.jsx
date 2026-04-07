import { BotOff, ChartLine, Home, HousePlusIcon, LogOut, LogOutIcon, School, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <>
     {/* <div className='fixed top-0 left-0 w-[300px] h-screen shadow-xl p-5 z-10'>
       <div className='w-[100px] h-[50px] flex items-center gap-2 justify-center'>
         <img src="/assent/Logo.png"  
         className='w-[50%] h-full bg-contain bg-center bg-no-repeat'
         />
         
         <h3 className='text-xl font-bold'>Nexus</h3>
       </div>

        <div className='my-[40px]'>
            <div className='my-3 text-white  w-full h-[40px] flex items-center gap-2 px-3 rounded-xl cursor-pointer bg-gradient-to-r from-[#721011] to-[#8A1A20] hover:bg-gradient-to-r hover:from-hover hover:to-secundary-color  '>
                <Home />
                <span className='text-sm font-bold'>Home</span>
            </div>

            <div className='my-3   w-full h-[40px] flex items-center gap-2 px-3 rounded-xl cursor-pointer text-[#111] hover:bg-gradient-to-r hover:from-hover hover:to-secundary-color  '>
                <HousePlusIcon />
                <span className='text-sm font-bold'>Campus</span>
            </div>
            <div className='my-3   w-full h-[40px] flex items-center gap-2 px-3 rounded-xl cursor-pointer text-[#111] hover:bg-gradient-to-r hover:from-hover hover:to-secundary-color  '>
                <User />
                <span className='text-sm font-bold'>Alumin</span>
            </div>
            <div className='my-3   w-full h-[40px] flex items-center gap-2 px-3 rounded-xl cursor-pointer text-[#111] hover:bg-gradient-to-r hover:from-hover hover:to-secundary-color  '>
                <ChartLine />
                <span className='text-sm font-bold'>Forum</span>
            </div>
            <div className='my-3   w-full h-[40px] flex items-center gap-2 px-3 rounded-xl cursor-pointer text-[#111] hover:bg-gradient-to-r hover:from-hover hover:to-secundary-color  '>
                <School />
                <span className='text-sm font-bold'>Class</span>
            </div>   
        </div>

        <div className='absolute left-0 bottom-10 w-full h-[100px] p-2'>
           <div className='flex items-center gap-3'>
             
             <Link to={'/profile'} className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-[60px] h-[60px] border border-gray-400 rounded-full bg-[#ccc]'>
                <User />
             </div>

             <div>
                <h3 className='text-sm font-semibold'>Alphonse Lukombo</h3>
                <span className='text-xs font-bold'>Estudante</span>
             </div>
             </Link>

             <div>
                <LogOutIcon className='cursor-pointer' />
             </div>

           </div>
        </div>
       </div> */}

    
    </>
  )
}
