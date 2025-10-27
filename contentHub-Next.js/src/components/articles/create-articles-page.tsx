"use client"
import React, { FormEvent, startTransition, useActionState, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'
import 'react-quill-new/dist/quill.snow.css'
import { createArticle } from '@/actions/create-article'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ReactQuill = dynamic(()=>import("react-quill-new") , {ssr:false})


const CreateArticlePage = () => {
    const router = useRouter();
    const [content , setContent] = useState<string>("")
    const [formState , action , isPending] = useActionState(createArticle , {errors:{}});
    // formState : - data jo action se return karega
    // action(name)  jo action perform karega 
    // isPending : complete or not

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
                         placeholder='Enter a article title'
                        />
                        {formState.errors.title && <span className='text-red-600 text-sm'>{formState.errors.title}</span> }
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='category'>Category</Label>
                        <select name="category" id="category" className='flex h-10 w-full border rounded-md'>
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
                        <Button variant={"outline"} onClick={()=>router.push('/dashboard')}>Cancel</Button>
                        <Button disabled={isPending} type="submit" > 
                            {
                                isPending ? (<Loader2 className='animate-spin'/>) : ("Publish")
                            }
                        </Button>
                    </div>


                </form>
            </CardContent>
        </Card>
    </div>
  )

}

export default CreateArticlePage

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["blockquote", "code-block"], 
//     ["link", "image"],
//     ["clean"],
//   ],
// };