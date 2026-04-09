import React from 'react'

export const TotalElments = ({text,total}) => {
  return (
    <div className='col-span-4'>
      <div className='text-left'>
        <h2 className='text-md font-bold'>{text} <span>{total}</span></h2>
      </div>  
    </div>
  )
}
