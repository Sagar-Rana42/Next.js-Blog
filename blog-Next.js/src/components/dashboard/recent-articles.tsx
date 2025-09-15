"use client"
import React, { useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Prisma } from '@/generated/prisma'
import { deleteArticle } from '@/actions/delete-article'


type RecentArticlesProps = {
    articles:Prisma.ArticlesGetPayload<{
        include:{
            comment:true,
            author:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true,
                };
            };
        };
    }>[]
};

const RecentArticles:React.FC<RecentArticlesProps> = ({articles}) => {
  return (
   <Card className='mb-8'>
     <CardHeader>
        <div className='flex items-center justify-between'>
            <CardTitle>
                Recent Articles
            </CardTitle>
            <Button variant={"ghost"} className='text-muted-foreground bg-gray-600' size={"sm"}>View All </Button>
        </div>
     </CardHeader>
     {!articles.length ?
      (<CardContent>Not articles found.</CardContent>)
       : (
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Comments</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            articles.map((article)=>(
                                <TableRow key={article.id}>
                                    <TableCell>
                                        <Badge variant={'secondary'} className=' rounded-full bg-green-100 text-green-800'>published</Badge>
                                    </TableCell>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.comment.length}</TableCell>
                                    <TableCell>{article.createdAt.toDateString()}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            <Link href={`/dashboard/articles/${article.id}/edit`}>
                                                <Button variant={"ghost"} size={"sm"} className='bg-gray-500'>Edit</Button>
                                            </Link>
                                            <DeleteButton  articleId={article.id}/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        
                    </TableBody>
                </Table>
            </CardContent>
     )}

   </Card>
  )
}

export default RecentArticles

type DeleteButton = {
    articleId:string
}

const DeleteButton:React.FC<DeleteButton> = ({articleId})=>{
   const [isPending , startTransition] = useTransition();
 
    return (
        <form action={()=>{
            startTransition(async()=>{
               await deleteArticle(articleId)
            })
        }}>
            <Button
             disabled={isPending}
             type="submit"
             size={"sm"}

             className= ' bg-red-400 hover:bg-red-800 transition'>{isPending ? "loading..." : "Delete"}</Button>
        </form>     
    )
}