
import  { Prisma } from '@/generated/prisma'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import LikeButton from './like-button'
import CommentList from '../comments/comment-list'
import CommentInput from '../comments/comment-input'
import { prisma } from '@/lib/prisma'

type  ArticleDetails = {
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
const ArticleDetailPages:React.FC<ArticleDetails> = async({article}) => {
  const comments = await prisma.comment.findMany({
    where:{
      articleId:article.id
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
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto py-12 px-4 sm:px-6 lg:px-8 '>
          <article className='mx-auto max-w-3xl '>
            <header className='mb-12'>
              <div className='flex flex-wrap gap-2 mb-4'>
                <span className=' px-3 py-1 text-sm '>
                    Web Development 
                </span>
              </div>
              <h1 className='text-4xl font-bold mb-4'>How to learn web development </h1>
              <div className='flex items-center gap-4'>
                <Avatar>
                  <AvatarImage src={article.author.imageUrl as string}>
                    
                  </AvatarImage>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{article.author.name}</p>
                  <p className='text-sm'>{article.createdAt.toDateString() }.12 min to read</p>
                </div>

              </div>
            </header>
            <section className='mb-12 max-w-none' dangerouslySetInnerHTML={{__html:article.content}}/>

            {/* like and comment button */}
            

              <LikeButton/>
              {/* section of comment */}
              <CommentInput articleId={article.id}/>
              <CommentList  comments = {comments}/>

          </article>
      </main>
    </div>
  )
}

export default ArticleDetailPages