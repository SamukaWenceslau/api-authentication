import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

class AuthController {

    async authenticate(request: Request, response: Response) {

        const { email, password } = request.body;

        const signUp = await AuthServices.authenticate(email, password);

        return response.status(signUp.status).json(signUp);

    }

}

export default new AuthController();