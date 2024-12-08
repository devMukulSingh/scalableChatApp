import { Server } from "socket.io";
import Redis from "ioredis";
import { produceMessage } from "./kafka";
import { ISocketMessage } from "../lib/types";
import { BASE_URL_CLIENT } from "../lib/base_url_client";

const pub = new Redis(process.env.REDISS_URL!)
const sub = new Redis(process.env.REDISS_URL!)

class SocketService {

    public onlineUsers: Map<string, string> | null;
    private _io: Server;
    constructor() {
        console.log("Init Socket Service...");
        this.onlineUsers = new Map();
        this._io = new Server({
            cors: {
                allowedHeaders: "*",
                origin: `${BASE_URL_CLIENT}`,
                methods: ["GET", "POST"],
            }
        })
        sub.subscribe('MESSAGES');
    }

    public initListeners() {

        const io = this.io;
        console.log("Init Socket Listeners...");
        //when socket's send message event is fired, we are publshing message to redis PUBLISHER
        io.on('connection', (socket) => {
            console.log("Socket connected",);
            const userId = socket.handshake.query.userId?.toString();
            if (!userId) {
                throw new Error('User id is undefined')
            }
            this.onlineUsers?.set(userId, socket.id)

            socket.on("event:message", async ({ message, receiverId, senderId }: ISocketMessage) => {
                console.log("new message, publishing to Rediss PUBLISHER...", message, receiverId, senderId);
                await pub.publish("MESSAGES", JSON.stringify({
                    message: message, senderId: senderId, receiverId: receiverId
                }));
            })
        }
        )
        io.on('connect_error', (err) => {
            console.log(err, "Error connection")
        })
        //then the message is received at the rediss SUBSCRIBER on 'MESSAGES' CHANNEL, so that we can emit the message to
        //  particular receiver
        sub.on('message', async (channel, message) => {
            if (channel === 'MESSAGES') {
                console.log(`new message received on Rediss Subscriber`, message);

                const messageObj = JSON.parse(message) as ISocketMessage;
                const receiverSocket = this.onlineUsers?.get(messageObj.receiverId)?.toString();

                if (receiverSocket) {
                    //sending the message to particular receiver
                    console.log(`Sending message to receiver ${receiverSocket}...`)
                    io.to(receiverSocket).emit("event:message", message)
                }
                else if (!receiverSocket) {
                    console.log(`Receiver socket is undefined`)
                }

                // producing the message to kafka, for inserting in db
                console.log(`Producing message to KAFKA...`)
                await produceMessage({ message });
                console.log(`Message produced to Kafka broker`);
            }
        })

    }
    get io() {
        return this._io
    }
}

export default SocketService