import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { PasswordTokenServices } from "./PasswordTokenServices";

class UsersServices {

    async create(name: string, email: string, password: string) {

        try {

            const usersRepository = getCustomRepository(UsersRepository);

            const userExists = await usersRepository.findOne({ email });

            if (userExists) {
                return { message: "User already exists!" };
            }

            const user = usersRepository.create({ name, email, password });

            const { id } = await usersRepository.save(user);

            const passwordTokenServices = new PasswordTokenServices()

            const passwordToken = await passwordTokenServices.create(id);

            delete user.password;

            return { user, passwordToken };

        } catch (error) {
            console.log(error);
        }


    }

}

export { UsersServices };