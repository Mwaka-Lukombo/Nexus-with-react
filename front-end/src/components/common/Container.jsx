import React from 'react'

export const Container = ({children}) => {
  return (
    <div className='relative w-[calc(100%-300px)] top-0 -right-[300px] py-[20px]'>
        {children}
    </div>
  )
}
