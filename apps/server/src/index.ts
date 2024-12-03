import http from "http"
import SocketService from "./services/socket";
import { startMessageConsumer } from "./services/kafka";
import { clerkMiddleware } from "@clerk/express";
import express from "express";

startMessageConsumer();
async function init() {
    const app = express();
    const server = http.createServer(app);
    app.use(clerkMiddleware());
    const socketServer = new SocketService();

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
    })

    socketServer.io.attach(server)

    socketServer.initListeners();
}

init()


