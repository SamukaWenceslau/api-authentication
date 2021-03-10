import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";

class UsersController {

    async create(request: Request, response: Response) {

        const { name, email, password } = request.body;

        const usersServices = new UsersServices();

        const res = await usersServices.create(name, email, password);

        return response.status(201).json(res);

    }

}

export { UsersController };