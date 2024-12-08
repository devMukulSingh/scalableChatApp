import { Router } from "express"
import { deleteMessageController, editMessageController, getMessagesController, postMessageController } from "../controllers/chatController";



const chatRouter = Router();

chatRouter.post('/post-message',postMessageController);
chatRouter.get('/get-messages',getMessagesController)
chatRouter.put('/edit-message', editMessageController)
chatRouter.delete('/delete-message', deleteMessageController)



export default chatRouter