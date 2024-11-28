import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";
import { ISocketMessage } from "../lib/types";

const pub = new Redis(process.env.REDISS_URL!)
const sub = new Redis(process.env.REDISS_URL!)

class SocketService {

    private _io: Server;
    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: "*",
                origin: "*"
            }
        })
        sub.subscribe('MESSAGES');
    }

    public initListeners() {

        const io = this.io;

        //when socket's send message event is fired, we are publshing message to redis PUBLISHER
        io.on('connect', (socket) => {
            console.log("Socket connected", socket.id);
            socket.on("event:message", async ({ msg,receiverId,senderId}: ISocketMessage) => {
                console.log("new message, publishing to Rediss PUBLISHER...", msg, receiverId, senderId);
                await pub.publish("MESSAGES", JSON.stringify({  
                    msg: msg, senderId: senderId, receiverId: receiverId
                }));
            })
        }
        )

        //then the message is received at the rediss SUBSCRIBER on 'MESSAGES' CHANNEL, so that we can emit the message to
        //  particular receiver
        sub.on('message', async (channel, message) => {
            if (channel === 'MESSAGES') {
                console.log(`new message received on Rediss Subscriber, emitting to all connected clients...`, message);
                //sending the message to particular receiver
                io.emit("event:message", message)
                // producing the message to kafka, for inserting in db
                await produceMessage({ message });
                console.log(`Message produced to kafka broker`);
            }
        })

    }
    get io() {
        return this._io
    }
}

export default SocketService