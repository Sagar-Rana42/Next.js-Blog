"use client"
import React, { useActionState } from 'react'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { createComment } from '@/actions/create-comment'
// import type { Prisma } from '@prisma/client'
import type { Prisma } from '@/generated/prisma'

type CommentList = {
  comments:Prisma.CommentGetPayload<{
    include:{
      author:{
        select:{
          name:true,
          email:true,
          imageUrl:true
        }
      }
    }

  }>[]
}

const CommentList:React.FC<CommentList>= ({comments}) => {
 return(
   <div className="space-y-8">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author.imageUrl as string} />
            <AvatarFallback>{comment.author.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <span className="font-medium text-foreground">
                {comment.author.name}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                {comment.createdAt.toDateString()}
              </span>
            </div>
            <p className="text-muted-foreground">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
 )
 
}

export default CommentList