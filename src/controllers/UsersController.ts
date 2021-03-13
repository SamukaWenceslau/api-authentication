import { Request, Response } from "express";
import UsersServices  from "../services/UsersServices";

class UsersController {

    async create(request: Request, response: Response) {

        const { name, email, password } = request.body;

        const res = await UsersServices.create(name, email, password);

        return response.status(201).json(res);

    }

    async updatePassword(request: Request, response: Response) {

        const { newPassword } = request.body;
        const { t } = request.query;

        const res = await UsersServices.updatePassword(newPassword, String(t));

        return response.json(res);

    }

    
}

export { UsersController };