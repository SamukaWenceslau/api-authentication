import { EntityRepository, Repository } from "typeorm";
import { PasswordToken } from "../models/PasswordToken";



@EntityRepository(PasswordToken)
class PasswordTokenRepository extends Repository<PasswordToken> { 

    async findByToken(id: string) {

        return await this.findOne({ user_id: id });

    }
}

export { PasswordTokenRepository };