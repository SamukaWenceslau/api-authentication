import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/Users";

@EntityRepository(User)
class UsersRepository extends Repository<User> { 

    async findByEmail(email: string) {

        const user = await this.findOne({ email });

        if(user) {
            return {status: true, user};
        }else {
            return {status: false};
        }

    }
}

export { UsersRepository };