import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";



class UsersServices {

    async create(name: string, email: string, password: string) {

        const usersRepository = getCustomRepository(UsersRepository);

        const userExists = await usersRepository.findOne({ email });

        if (userExists) {
            return { message: "User already exists!" };
        }

        const user = usersRepository.create({ name, email, password });

        await usersRepository.save(user);

        //delete user.password;

        return { user };

    }

}

export { UsersServices };