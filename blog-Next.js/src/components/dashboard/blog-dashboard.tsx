import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FileText, MessageCircle, PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentArticles from './recent-articles'

const BlogDashboard = () => {
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
            <div className='text-2xl font-bold'> 2 
            <p className='text-sm text-muted-foreground mt-1'>+5 from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className=''>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className=' text-sm '>
              Total Comments 
             
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
            <MessageCircle/>
          </CardHeader>

          <CardContent>
            <div className='text-2xl font-bold'> 3 
            <p className='text-sm text-muted-foreground mt-1'>+0.6 from last </p>
            </div>
          </CardContent>
        </Card>

      </div>

     
      <RecentArticles/>
    </main>
  )
}

export default BlogDashboard