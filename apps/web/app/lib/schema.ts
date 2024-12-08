import {z} from "zod"

export const editMessageSchema = z.object({
     message:z.string().trim().min(1,{
        message:"Message is required"
     })
})