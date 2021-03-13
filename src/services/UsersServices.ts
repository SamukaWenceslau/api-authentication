import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import PasswordTokenServices  from "./PasswordTokenServices";
import bcrypt from "bcryptjs";

class UsersServices {


    async findByEmail(email: string) {

        const usersRepository = getCustomRepository(UsersRepository);

        const userExists = await usersRepository.findOne({ email });

        if (userExists) {
            return {status: true, user: userExists};
        }else {
            return {status: false};
        }

    }

    async create(name: string, email: string, password: string) {

        try {

            const usersRepository = getCustomRepository(UsersRepository);

            const userExists = await this.findByEmail(email);

            if (userExists.status) {
                return { message: "User already exists!" };
            }

            const user = usersRepository.create({ name, email, password });

            const { id } = await usersRepository.save(user);

            const passwordToken = await PasswordTokenServices.create(id);

            delete user.password;

            return { user, passwordToken };

        } catch (error) {
            console.log(error);
        }


    }

    async updatePassword(newPassword: string, token: string) {

        const usersRepository = getCustomRepository(UsersRepository);

        const isTokenValid = await PasswordTokenServices.validate(token);

        if(isTokenValid.status) {

            const hashPassword = bcrypt.hashSync(newPassword, 10);

            await usersRepository.update(isTokenValid.token.user_id, {password: hashPassword});

            await PasswordTokenServices.update(isTokenValid.token.id);

            return {message: "Update password!"};

        }else {
            
            return {message: "Token invalid!"};

        }
    }

}

export default new UsersServices();