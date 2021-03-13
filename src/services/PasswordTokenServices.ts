import { getCustomRepository } from "typeorm";
import { PasswordTokenRepository } from "../repositories/PasswordTokenRepository";
import {v4 as uuid} from "uuid";
//import UsersServices from "./UsersServices";


class PasswordTokenServices {

    async findByToken(id: string) {

        const ptRepository = getCustomRepository(PasswordTokenRepository);

        const  { token } = await ptRepository.findOne({ user_id: id });

        return token;

    }

    async validate(token: string) {

        const ptRepository = getCustomRepository(PasswordTokenRepository);

        const tokenExist = await ptRepository.findOne({ token });

        if (tokenExist) {
            return { status: true, token: tokenExist }
        } else {
            return { status: false }
        }

    }

    async create(id: string) {

        const ptRepository = getCustomRepository(PasswordTokenRepository);

        const UserPasswordToken = await ptRepository.create({ user_id: id });

        await ptRepository.save(UserPasswordToken);

        return { UserPasswordToken };

    }

    async update(id: string) {

        const ptRepository = getCustomRepository(PasswordTokenRepository);

        await ptRepository.update(id, {token: uuid()});

    }

}

export default new PasswordTokenServices();