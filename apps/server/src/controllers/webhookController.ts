import { Webhook } from 'svix'
import { Response } from 'express'
import { prisma } from '../lib/prisma'



type Ievent = {
    type: string,
    data: {
        first_name: string,
        last_name: string,
        id: string,
        email_addresses: {
            email_address: string
        }[]
    }
}

export async function webHookController(req: Request, res: Response) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET
    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headers = req.headers;
    const payload = req.body;

    if (!payload) {
        return res.status(400).json({
            error: "Payload is required"
        })
    }
    let evt: Ievent

    // Verify payload with headers
    try {
        //@ts-ignore
        evt = wh.verify(payload, headers) as Ievent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return res.status(400).json({ Error: 'Verification error' })
    }


    if (evt.type === "user.created") {
        const { email_addresses, first_name, id, last_name } = evt.data

        const newUser = await prisma.user.create({
            data: {
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}`,
                id: id
            }
        })
        console.log("user created")
        return res.status(200).json('user created')
    }


    return res.status(200).json('Webhook received')

}