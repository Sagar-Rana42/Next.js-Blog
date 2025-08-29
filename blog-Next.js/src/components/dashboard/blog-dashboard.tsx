import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Clock, FileText, MessageCircle, PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentArticles from './recent-articles'
import { prisma } from '@/lib/prisma'

const BlogDashboard = async() => {
  const [articles , totalComment] = await Promise.all([
    prisma.articles.findMany({
      orderBy:{
        createdAt:'desc'
      },
      include:{
        comment:true,
        author:{
          select:{
            name:true,
            email:true,
            imageUrl:true
          }
        }
      }
    }),
    prisma.comment.count()
  ])

  return (
    <main className='flex-1 p-4 md:p-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1>Blog Dashboard</h1>
          <p>Mangae your content and analytics</p>

        </div>

        <Link href={'/dashboard/articles/create'}>
          <Button >
            <PlusCircle className='w-5 h-5' />New Articles
          </Button>
        </Link>
      </div>

      {/* statics  */}
      <div className='grid md:grid-cols-3 gap-4 mb-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className=' text-sm'>
              Total Articles
            </CardTitle>
            <FileText/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'> {articles?.length || 5}
            <p className='text-sm text-muted-foreground mt-1'>+5 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className=''>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className=' text-sm '>
              {totalComment || 10}
             
            </CardTitle>
            <MessageCircle/> 
            
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'> 3 
            <p className='text-sm text-muted-foreground mt-1'>12 awating in modration</p>
            </div>
          </CardContent>
        </Card>

        <Card className=''>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>
              Avg. Rating Time
            </CardTitle>
            <Clock/>
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'> 3 
            <p className='text-sm text-muted-foreground mt-1'>+0.6 from last </p>
            </div>
          </CardContent>
        </Card>

      </div>

     
      <RecentArticles articles={articles}/>
    </main>
  )
}

export default BlogDashboard