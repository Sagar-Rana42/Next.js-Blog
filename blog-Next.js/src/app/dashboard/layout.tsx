import React from 'react'
import LeftsideBar from '@/components/dashboard/left-sidebar'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='min-h-screen w-full'>
        <div className='flex'>
            <LeftsideBar/>
            <div className='flex-1'>
                {children}
            </div>
           
        </div>
       
    </div>
  )
}

export default layout