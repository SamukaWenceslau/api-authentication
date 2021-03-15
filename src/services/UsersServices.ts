import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import PasswordTokenServices  from "./PasswordTokenServices";
import bcrypt from "bcryptjs";

class UsersServices {

    async create(name: string, email: string, password: string) {

        try {

            const userRepository = getCustomRepository(UsersRepository);

            const userExists = await userRepository.findByEmail(email);

            if (userExists.status) {
                return { status: 406, message: "User already exists!" };
            }

            const user = userRepository.create({ name, email, password });

            const { id } = await userRepository.save(user);

            await PasswordTokenServices.create(id);

            delete user.password;

            return { status: 201, message: "Successfully user has been created"};

        } catch (error) {
            console.log(error);
        }


    }

    async updatePassword(newPassword: string, token: string) {

        const usersRepository = getCustomRepository(UsersRepository);

        const isTokenValid = await PasswordTokenServices.validate(token);

        if(isTokenValid.status) {

            const hashPassword = bcrypt.hashSync(newPassword, Number(process.env.SALT));

            await usersRepository.update(isTokenValid.token.user_id, {password: hashPassword});

            await PasswordTokenServices.update(isTokenValid.token.id);

            return {status: 200, message: "Update password!"};

        }else {
            
            return {status: 406, message: "Token invalid!"};

        }
    }

}

export default new UsersServices();