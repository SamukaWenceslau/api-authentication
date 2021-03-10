import { getCustomRepository } from "typeorm";
import { PasswordTokenRepository } from "../repositories/PasswordTokenRepository";


class PasswordTokenServices {

    async create(id: string) {

        //ptRepository = passwordtokenRepository 
        const ptRepository = getCustomRepository(PasswordTokenRepository);

        const UserPasswordToken = await ptRepository.create({ user_id: id });

        await ptRepository.save(UserPasswordToken);

        return { UserPasswordToken };

    }


}

export { PasswordTokenServices };