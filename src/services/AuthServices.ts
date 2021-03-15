import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


class AuthServices {
    
    async authenticate(email: string, password: string) {

        const userRepository = getCustomRepository(UsersRepository);

        const {status, user} = await userRepository.findByEmail(email);

        if(!status) {
            return { status: 406, message: "User doesn't exist"};
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return {status: 406, message: "Incorrect password"}
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d'});

        delete user.password;

        return {status: 200, message: "Successful authentication!", token};

    }
}

export default new AuthServices();