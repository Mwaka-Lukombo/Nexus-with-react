import React from 'react'

export const VoidElements = ({text,emoji}) => {
  return (
    <div className='flex  items-center justify-center col-span-4'>
      <div className='flex items-center justify-center w-[70%] h-[70px] bg-secundary-color rounded-tl-xl rounded-bl-xl'>
        <p className='text-white text-lg font-normal tracking-normal'>{text}</p>
      </div>

      <div className='flex items-center justify-center w-[30%] h-[70px] bg-hover rounded-tr-xl rounded-br-xl'>
        <p className='text-5xl animate-pulse'>{emoji}</p>
      </div>
    </div>
  )
}
