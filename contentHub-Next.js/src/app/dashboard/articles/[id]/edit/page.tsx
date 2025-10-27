import EditArticlePage from '@/components/articles/edit-article-page'
import { prisma } from '@/lib/prisma'
import React from 'react'

type editparam = {
    params:Promise<{id:string}>
}

const page:React.FC<editparam> =async ({params}) => {

    const id = (await params).id
    const article = await prisma.articles.findUnique({
        where:{
            id
        }
    })
    if(!article){
        return  <h1>Article not found</h1>
    }

  return (
    <EditArticlePage article = {article}/>
    
  )
}

export default page