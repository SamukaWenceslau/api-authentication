import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

//controllers
import AuthController from "./controllers/AuthController";
import UsersController from "./controllers/UsersController";
import SendMailController from "./controllers/SendMailController";

const router = Router();

// User routes
router.get("/user", authMiddleware, UsersController.show)
router.post("/user", UsersController.create)
router.put("/user/forgotpassword", UsersController.update)     

// SendMail routes
router.post("/user/forgotpassword", SendMailController.execute)

// Auth routes
router.post("/login", AuthController.authenticate)


export { router };