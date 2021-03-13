import { Router } from "express";

//controllers
import AuthController from "./controllers/AuthController";
import UsersController from "./controllers/UsersController";
import SendMailController from "./controllers/SendMailController";

const router = Router();


router.post("/user", UsersController.create)
      .put("/user/forgotpassword", UsersController.update)     
      .post("/user/forgotpassword", SendMailController.execute)
      .post("/login", AuthController.authenticate)


export { router };