import { Loader, Loader2 } from 'lucide-react'
import React from 'react'

export const LoaderComponent = ({size}) => {
  return (
    <div className='flex items-center justify-center text-white'>
        <Loader2 className={`${size} animate-spin`} />
    </div>
  )
}
