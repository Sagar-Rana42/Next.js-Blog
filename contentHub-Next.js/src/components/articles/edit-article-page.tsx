"use client"

import React, { FC, FormEvent, startTransition, useActionState, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css";
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import type { Articles } from '@/generated/prisma'
import Image from 'next/image'
// import { createArticle } from '@/actions/create-article'
import { editArticle } from '@/actions/edit-article'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


type articleParam  = {
    params:Promise<{id:string}>
}

type articleType = {
    article:Articles,
}

const EditArticlePage:React.FC<articleType> = ({article }) => {
    const router = useRouter();
    const [formState , action , isPending] = useActionState(editArticle.bind(null , article.id) , {errors:{}});
    const [content , setContent] = useState<string>(article?.content);

    const handleSubmit = (e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // which would refresh/reload the page when a form is submitted).
        const formData = new FormData(e.currentTarget);
        formData.append("content" , content);

        startTransition(()=>{
            // console.log("form data= " , formData);
            action(formData);
        })
    }
    
        
  return (
    <div className='max-w-4xl mx-auto p-6'>
        <Card>
            <CardHeader>
                <CardTitle>Create new Article</CardTitle>
            </CardHeader>
            <CardContent>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <Input
                         type='text'
                         name='title'
                         defaultValue={article?.title}
                         placeholder='Enter a article title'
                        />
                        {formState.errors.title && <span className='text-red-600 text-sm'>{formState.errors.title}</span> }
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='category'>Category</Label>
                        <select name="category" id="category" defaultValue={article?.category} className='flex h-10 w-full border rounded-md'>
                            <option value="" >Select</option>
                            <option value="technology" >Technology</option>
                            <option value="programming" >Programming</option>
                            <option value="webDevelopment" >Web development</option>
                        </select>
                        {formState.errors.category && <span className='text-red-600 text-sm'>{formState.errors.category}</span>}

                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='featuredImage'>Featured Image</Label>
                        <Input
                          type='file'
                          id='featuredImage'
                          name='featuredImage'
                          accept='image/*'
                        />
                        {
                            article.featuredImage && 
                            <div>
                                <img
                                    src={article.featuredImage}
                                    alt='Image'
                                    className='h-52 w-42 object-cover rounded-sm'
                                />
                            </div>
                        }
                        

                    </div>

                    <div className='space-y-2'>
                        <Label>Content</Label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            
                            onChange={setContent}
                            // modules={modules}
                        />
                        {formState.errors.content! && <span className='text-red-600 text-sm'>{formState.errors.content[0]}</span>}
                    </div>

                    <div className='flex justify-end gap-4'>
                        
                        <Link href={'/dashboard'}>
                        <Button variant={"outline"}>Cancel</Button></Link>
                        {/* <Link  className='text-center text-red-300 ' href={'/dashboard'}>Cancel</Link> */}
                        <Button disabled={isPending} type="submit" > 
                            {
                                isPending ? (<Loader2 className='animate-spin'/>) : ("edit article")
                            }
                        </Button>
                    </div>


                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default EditArticlePage