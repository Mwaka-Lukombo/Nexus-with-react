import { Trash } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const MyClassSkeleton = () => {


  return (
    <div className='p-2'>
      <div className={`w-full md:h-[200px] flex justify-center md:justify-normal mb-4 shadow-xl skeleton  border border-[#ccc]  `}>
     <div className='w-[15%] hidden md:flex items-center justify-center h-full '>
       <img src={""} 
       className='bg-cover bg-center bg-no-repeat'
       />
     </div>

     <div className='w-[85%] h-full p-7 px-2 rounded-tr-xl rounded-br-xl bg-gray/60 '>
      <h2 className='w-[80%] h-4 bg-gray/90 animate-pulse mb-3 rounded-xl  text-2xl font-normal text-center md:text-left'></h2>
      <p className='w-[50%] h-4 bg-gray/90 animate-pulse rounded-xl'></p>
     </div>
     </div>


      <div className='w-full grid md:grid-cols-4 gap-3'>
        
          <Link to='' className='col-span-1 h-[300px] transition duration-300 border bg-gray/50 skeleton border-[#ccc] rounded-xl shadow-xl
          hover:translate-y-[-10px]
          '>
          <div className='relative w-full h-[145px] rounded-tl-xl rounded-tr-xl'>
            
            <img src="" 
             className='w-full h-full bg-cover bg-no-repeat rounded-tl-xl rounded-tr-xl'
            />
            
             {/* Overlay */}
            <div className='absolute top-0 left-0 w-full h-full bg-gray/50 rounded-tl-xl rounded-tr-xl'>
              
              <div className='absolute top-2 p-3 text-white'>
              <h1 className='text-2xl font-normal leading-normal'></h1>
              <h3 className='text-xl font-mono'></h3>
              <p className='text-sm'></p>
              <p className='text-sm font-bold'></p>
            </div>
            
            <div className='skeleton absolute right-10 bottom-[-40px] w-[80px] h-[80px] bg-gray/50 rounded-full  border border-[#ccc]'>
              <div
              className=' w-full h-full bg-cover bg-no-repeat rounded-full bg-gray/50'
              ></div>
            </div>

            </div>
          </div>

          <div className='relative w-full h-[155px] rounded-bl-xl rounded-br-xl'>
            <div className='flex items-center justify-end px-2 absolute w-full h-[60px] bottom-0 border-t border-[#ccc]'>
               <button 
                className="btn skeleton  flex items-center justify-center">
                 <span className='opacity-0'>000</span>
               </button>               
            </div>
          </div>


        </Link>

        <Link to='' className='col-span-1 h-[300px] transition duration-300 border bg-gray/50 skeleton border-[#ccc] rounded-xl shadow-xl
          hover:translate-y-[-10px]
          '>
          <div className='relative w-full h-[145px] rounded-tl-xl rounded-tr-xl'>
            
            <img src="" 
             className='w-full h-full bg-cover bg-no-repeat rounded-tl-xl rounded-tr-xl'
            />
            
             {/* Overlay */}
            <div className='absolute top-0 left-0 w-full h-full bg-gray/50 rounded-tl-xl rounded-tr-xl'>
              
              <div className='absolute top-2 p-3 text-white'>
              <h1 className='text-2xl font-normal leading-normal'></h1>
              <h3 className='text-xl font-mono'></h3>
              <p className='text-sm'></p>
              <p className='text-sm font-bold'></p>
            </div>
            
            <div className='skeleton absolute right-10 bottom-[-40px] w-[80px] h-[80px] bg-gray/50 rounded-full  border border-[#ccc]'>
              <div
              className=' w-full h-full bg-cover bg-no-repeat rounded-full bg-gray/50'
              ></div>
            </div>

            </div>
          </div>

          <div className='relative w-full h-[155px] rounded-bl-xl rounded-br-xl'>
            <div className='flex items-center justify-end px-2 absolute w-full h-[60px] bottom-0 border-t border-[#ccc]'>
               <button 
                className="btn skeleton  flex items-center justify-center">
                 <span className='opacity-0'>000</span>
               </button>               
            </div>
          </div>


        </Link>

      </div>
    </div>
  )


}
