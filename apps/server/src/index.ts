import http from "http"
import SocketService from "./services/socket";
import { startMessageConsumer } from "./services/kafka";

startMessageConsumer();
async function init(){
    const httpServer = http.createServer()
    const PORT = process.env.PORT || 8000;
    const socketServer = new SocketService();

    httpServer.listen( PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
        
    })
    
    socketServer.io.attach(httpServer)

    socketServer.initListeners();
}

init()


