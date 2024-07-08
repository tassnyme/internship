import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
function Admin() {
  return (
    <div className='flex justify-start w-[100vw] lg:gap-4 md:gap-2 sm:gap-1 py-2 px-4'>
        <Sidebar />
         <Header/>        
    </div>
  )
}

export default Admin
