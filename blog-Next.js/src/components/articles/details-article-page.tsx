
import { Prisma } from '@/generated/prisma'
import React from 'react'

type ArticleDetails = {
  article:Prisma.ArticlesGetPayload<{
    include:{
      author:{
        select:{
          name:true,
          email:true,
          imageUrl:true
        }
      }
    }
  }>

  
}
const ArticleDetailPages:React.FC<ArticleDetails> = () => {
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto py-12 px-4 sm: '>

      </main>
    </div>
  )
}

export default ArticleDetailPages