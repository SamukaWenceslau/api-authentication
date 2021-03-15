import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import UsersServices from "../services/UsersServices";

class UsersController {

    async show(request: Request, response: Response) {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ id: request.userId });

        delete user.password

        return response.status(200).json(user);

    }

    async create(request: Request, response: Response) {

        const { name, email, password } = request.body;

        const res = await UsersServices.create(name, email, password);

        return response.status(res.status).json({message: res.message});

    }

    async update(request: Request, response: Response) {

        const { newPassword } = request.body;
        const { t } = request.query;

        const res = await UsersServices.updatePassword(newPassword, String(t));

        return response.status(res.status).json({message: res.message});
    }


}

export default new UsersController();