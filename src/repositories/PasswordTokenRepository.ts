import { EntityRepository, Repository } from "typeorm";
import { PasswordToken } from "../models/PasswordToken";

@EntityRepository(PasswordToken)
class PasswordTokenRepository extends Repository<PasswordToken> { }

export { PasswordTokenRepository };