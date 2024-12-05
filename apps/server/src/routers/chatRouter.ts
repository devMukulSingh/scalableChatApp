import { Router } from "express"
import { getMessagesController, postMessageController } from "../controllers/chatController";



const chatRouter = Router();

chatRouter.post('/post-message',postMessageController);
chatRouter.get('/get-messages',getMessagesController)


export default chatRouter