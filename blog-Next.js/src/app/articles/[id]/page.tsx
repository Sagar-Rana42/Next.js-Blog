import ArticleDetailPages from '@/components/articles/details-article-page'
import { prisma } from '@/lib/prisma'
import React from 'react'

type ArticleDetailPage = {
    params:Promise<{id:string}>
}
type ArticleDetails = {
    article:{
        author:{
            
        }
    }
}

const page:React.FC<ArticleDetailPage> = async({params }) => {
    const id  = (await params).id

    const article = await prisma.articles.findUnique({
        where:{
            id
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true
                }
            }
        }
    })
    if(!article){
        return <h1 className='text-2xl text-red-500'>Article not found</h1>
    } 

  return (
    <div>
        <ArticleDetailPages article = {article}/>
    </div>
  )
}

export default page