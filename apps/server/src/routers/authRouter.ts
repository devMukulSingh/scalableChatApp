import { Router } from "express";
import { getAllUsersContoller } from "../controllers/authController";


const authRouter = Router();
authRouter.get('/get-all-users',getAllUsersContoller)
// authRouter.post('sign-in', signInController);


export default authRouter;
