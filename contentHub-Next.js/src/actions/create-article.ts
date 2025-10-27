"use server"
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {v2 as cloudinary , UploadApiResponse, UploadStream} from "cloudinary"

import {z} from 'zod'
import { rejects } from 'assert'
import { error } from 'console'
import { resolve } from 'path'
import { buffer } from 'stream/consumers'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
// check which type are data is comming in form
const CreateArticleSchema = z.object({
    title:z.string().min(3).max(100),
    category:z.string().min(3).max(50),
    content:z.string().min(10)
})

// type for error 
type articleFormState = {
    errors:{
        title?:string[]; // if u guarantee that each field will only ever have one error message ,then ony string will be enough ,  
        category?:string[];
        featuredImage?:string[];
        content?:string[];
        formErrors?:string[]; 
    };
}

export const createArticle = async(prevState : articleFormState , formData : FormData) : Promise<articleFormState> =>{
    // console.log("incomming call for create articles");
    // console.log("formData = " , formData);

    const result = CreateArticleSchema.safeParse({
        title:formData.get('title'),
        category:formData.get('category'),
        content:formData.get('content')
    })
    // console.log("result = " , result);
    // either it will give success or failure 
    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors
            // result.error.flatten() transforms the raw Zod error object into a simpler shape:
        }
    }

    const {userId} = await auth();

    // console.log("userId = " , userId);
    if(!userId){
        return {
            errors:{
                formErrors:['please login']
            },
        };
    }

    const existingUser = await prisma.user.findUnique({
        where:{
            clerkUserId:userId
        }
    })
    // console.log("existring user = " , existingUser);

    if(!existingUser){
        return{
            errors:{
                formErrors:['User not found , please login']
            }
        }
    }

    const imageFile = formData.get('featuredImage') as File | null
    // console.log("image file = " , imageFile);
    if(!imageFile || imageFile.name === "undefined"){
        return{
            errors:{
                featuredImage:['Image file is required']
            }
        }
    }
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse : UploadApiResponse | undefined = await new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
           { resource_type:'auto'},
           (error , result)=>{
                if(error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
           }
        )
        uploadStream.end(buffer);
    })

    const imageUrl = uploadResponse?.secure_url;
    if(!imageUrl){
        return{
            errors:{
                featuredImage:['failed to upload image. please try again']
            }
        }
    }
    try {
      await  prisma.articles.create({
        data:{
            title:result.data.title,
            category:result.data.category,
            content:result.data.content,
            featuredImage:imageUrl,
            authorId:existingUser.id
        }
       })
       console.log("created successfully ")
    } catch (error : unknown) {
         console.log("not successfully ")
        if(error instanceof Error){
            return{
                errors:{
                    formErrors:[error.message]
                }
            }
        }else{
            return{
                errors:{
                    formErrors:['internal server error occur ']
                }
            }
        }
    }

    revalidatePath('dashboard')
    redirect("/dashboard")


}