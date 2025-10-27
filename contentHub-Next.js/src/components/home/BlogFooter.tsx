import Link from 'next/link'
import React from 'react'

const BlogFooter = () => {
  return (
    <section className='w-full flex justify-evenly border-t '>
      <div className='m-6 '>
        <h1 className=' bg-gradient-to-r from-amber-200  to-amber-600  bg-clip-text text-transparent mb-4 text-xl hover:text-blue-400 cursor-pointer transition duration-300'>Connect</h1>
        <ul className='text-center text-sm  text-blue-200'>
          <Link href={'/'}>
            <li className='hover:text-blue-500 duration-300'>Facebook</li>
          </Link>
          <Link href={'https://www.linkedin.com/in/sagar-rana-999a04256/'}>
            <li className='hover:text-blue-500 duration-300'>Linkdin</li>
          </Link> 
          <Link href={'/'}>
            <li className='hover:text-blue-500 duration-300'>Instagram</li>
          </Link> 
          <Link href={'https://github.com/Sagar-Rana42/Sagar-Rana42'}>
            <li className='hover:text-blue-500 duration-300'>Github</li>
          </Link> 
        
        </ul>
      </div>
      <div className='m-6'>
        <h1 className=' bg-gradient-to-r from-amber-200  to-amber-600  bg-clip-text text-transparent mb-4 text-xl hover:text-blue-400 cursor-pointer transition duration-300'>Terms & condition</h1>
      </div>
      <div className='m-6'>
        <h1 className=' bg-gradient-to-r from-amber-200  to-amber-600  bg-clip-text text-transparent mb-4 text-xl hover:text-blue-400 cursor-pointer transition duration-300'>contact</h1>
        <h3 className='hover:cursor-pointer bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent'>Email:sagarkumarrana743@gmail.com</h3>
        {/* <p className='text-blue-500'><a href="mailto:sagarkumarrana743@gmail.com">Send email</a></p> */}
        <h3  className='hover:cursor-pointer bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent'>Contact:7481832701</h3>
        
      </div>
    </section>
  )
}

export default BlogFooter