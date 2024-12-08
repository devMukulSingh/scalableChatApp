import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export async function postMessageController(req: Request, res: Response): Promise<any> {
    try {
        console.log(req.body)
        const { senderId, receiverId, message } = req.body;
        const newMessage = await prisma.message.create({
            data: {
                message,
                receiverId,
                senderId
            }
        })
        return res.status(200).json({ msg: "Message created successfully" })
    }
    catch (e) {
        return res.status(500).json({
            error: `Error in postMessageController`, e
        })
    }
}

export async function getMessagesController(req: Request, res: Response): Promise<any> {
    try {
        const { senderId, receiverId } = req.query

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: senderId?.toString(),
                        receiverId: receiverId?.toString()

                    },
                    {
                        senderId: receiverId?.toString(),
                        receiverId: senderId?.toString()
                    }
                ]
            }
        })
        return res.status(200).json(messages)
    }
    catch (e) {
        return res.status(500).json({
            error: `Error in getMessagesController`, e
        })
    }
}

export async function editMessageController(req:Request,res:Response):Promise<any> {
    try{
        console.log(req.body)
        const { message,id } = req.body;

        if(!message) return res.status(400).json({
            error:"Message is required"
        })
        if (!id) return res.status(400).json({
            error: "messageId is required"
        })

        const editedMessage = await prisma.message.update({
            where:{
                id,
            }  ,
            data:{
                message
            }
        })

        return res.status(200).json({
            message:"Message edited",
        })
    }
    catch(e){
        console.log("Error in editMessageController",e)
        return res.status(500).json({
            error:"Error in editMessageController",e
        });

    }
}

export async function deleteMessageController(req: Request, res: Response): Promise<any> {
    try {
        const { messageId } = req.body;

        if (!messageId) return res.status(400).json({
            error: "messageId is required"
        })

        const editedMessage = await prisma.message.delete({
            where: {
                id: messageId,
            }
        })

        return res.status(200).json({
            message: "Message edited",
        })
    }
    catch (e) {
        console.log("Error in deleteMessageController", e)
        return res.status(500).json({
            error: "Error in deleteMessageController", e
        });

    }
}