import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

//controllers
import AuthController from "./controllers/AuthController";
import UsersController from "./controllers/UsersController";
import SendMailController from "./controllers/SendMailController";

const router = Router();


router.get("/user", authMiddleware, UsersController.show)
      .post("/user", UsersController.create)
      .put("/user/forgotpassword", UsersController.update)     
      .post("/user/forgotpassword", SendMailController.execute)
      .post("/login", AuthController.authenticate)


export { router };