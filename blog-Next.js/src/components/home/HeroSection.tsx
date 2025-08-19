import React from 'react'

const HeroSection = () => {
  return (
   <section className='relative min-h-[600px] w-full overflow-hidden
    bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-800'>
        <div className='absolute inset-0 before:absolute before:left-1/4  before:top-0 before:h-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600 before:blur-3xl '>
            hiiii

        </div>

        <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24
         md:flex-row md:py-32'>
            <div className='flex-1 space-y-8 text-center md:text-left'>
                <h1 className='text-4xl font-bold tracking-tight text-white'>Explore the world 
                    <span>Words</span>
                 </h1>
               
            </div>
           
        </div>
   </section>
  )
}

export default HeroSection