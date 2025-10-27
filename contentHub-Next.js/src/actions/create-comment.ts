"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import {z} from "zod"

const commentSchema = z.object({
    body:z.string().min(2)
})

type commentFormState = {
    errors:{
        body?:string[],
        formErrors?:string[]
    }
}

export const createComment  = async (articleId : string , prevState : commentFormState , formData:FormData) :Promise<commentFormState>=>{
    const result = commentSchema.safeParse({
        body:formData.get('body')
    })

    if(!result.success){
        return{
            errors:result.error.flatten().fieldErrors
        }
    }

    const {userId} = await auth()
    if(!userId){
        return{
            errors:{
                formErrors:["please login"]
            }
        }
    }

    const loginUser = await prisma.user.findUnique({
        where:{
            clerkUserId:userId
        }
    })

    if(!loginUser){
        return {
            errors:{
                formErrors:['user not found , please login']
            }
        }
    }

    try {
        await prisma.comment.create({
            data:{
                content:result.data.body,
                authorId:loginUser.id,
                articleId
            }
        })
    } catch (error:unknown) {
        if(error instanceof Error){
            return{
                errors:{
                    formErrors:[error.message]
                }
            }
        }
        else{
            return{
                errors:{
                    formErrors:['Error while ,adding comment']
                }
            }
        }
    }
    alert("comment created successfully");
    revalidatePath(`/articles/${articleId}}`)

    return {errors:{}}

}