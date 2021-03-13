import { Router } from "express";
import { SendMailController } from "./controllers/SendMailController";
import { UsersController } from "./controllers/UsersController";

const router = Router();
const usersController = new UsersController();
const sendMailController = new SendMailController();

router.post("/user", usersController.create)
      .post("/user/forgotpassword", sendMailController.execute)
      .post("/user/changepassword", usersController.updatePassword)


export { router };