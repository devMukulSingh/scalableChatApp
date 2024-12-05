import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export async function getAllUsersContoller(req: Request, res: Response): Promise<any> {
    try {
        const allUsers = await prisma.user.findMany();
        return res.status(200).json(allUsers)
    }
    catch (e) {
        return res.status(500).json({
            error: "Error in getAllUsersContoller", e
        })
    }
}

