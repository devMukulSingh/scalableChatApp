import http from "http"
import SocketService from "./services/socket";
import { startMessageConsumer } from "./services/kafka";
import { clerkMiddleware } from "@clerk/express";
import express from "express";
import authRouter from "./routers/authRouter";
import chatRouter from "./routers/chatRouter";
import cors from "cors"
import { webHookController } from "./controllers/webhookController";
import bodyParser from "body-parser";
// startMessageConsumer();

async function init() {

    const app = express();
    // app.use(clerkMiddleware());
    // app.use(express.json())
    app.use(cors({
        origin:'http://localhost:3000'
    }))
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/chat',chatRouter)
    //@ts-ignore
    app.post('/api/webhooks', bodyParser.raw({ type: 'application/json' }), webHookController)
    const server = http.createServer(app);
    
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
    })
    
    const socketServer = new SocketService();

    socketServer.io.attach(server)

    socketServer.initListeners();
}

init()


