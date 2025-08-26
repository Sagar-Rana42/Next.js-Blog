    import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import Link from 'next/link'

const RecentArticles = () => {
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
     <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>
                        <Badge variant={'secondary'} className=' rounded-full bg-green-100 text-green-800'>Published</Badge>
                    </TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>12 feb</TableCell>
                    <TableCell>
                        <div className='flex gap-2'>
                            <Link href={`/dashboard/articles/${123}/edit`}>
                                <Button variant={"ghost"} size={"sm"} className='bg-gray-500'>Edit</Button>
                            </Link>
                            <DeleteButton/>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
     </CardContent>
   </Card>
  )
}

export default RecentArticles

const DeleteButton = ()=>{
    return (
        <form>
            <Button  type="submit" size={"sm"} className= ' bg-red-400 hover:bg-red-800 transition'>delete</Button>
        </form>     
    )
}