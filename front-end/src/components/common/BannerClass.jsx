import React from 'react'

export const BannerClass = ({title,text,color,bg}) => {
  return (
    <div className={`w-full md:h-[200px] flex justify-center md:justify-normal mb-4 shadow-xl ${color ?? "bg-secundary-color/85"} border border-[#ccc] rounded-3xl ${bg && `bg-[${bg}]`}`}>
     <div className='w-[15%] hidden md:flex items-center justify-center h-full '>
       <img src={bg || "/uxr_recruitment_education_card_v2.png"} 
       className='bg-cover bg-center bg-no-repeat'
       />
     </div>

     <div className='w-[85%] h-full p-7 px-2 rounded-tr-xl rounded-br-xl text-white'>
      <h2 className='text-2xl font-normal text-center md:text-left'>{title ?? "Teach your students with online method"}</h2>
      <p className='my-3 text-sm text-justify tracking-[1px] max-w-[700px]'>{text ?? `Jean Piaget is the first university put the online and presential leading method 
       join with us and leave in this mod\n Nexus piaget was developed with Alphonse Mwaka Lukombo old student in this university
       he dos Enginner informatic in 2025 class.
      `}</p>
     </div>
    </div>
  )
}
