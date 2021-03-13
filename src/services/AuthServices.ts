import UsersServices from "./UsersServices";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthServices {
    
    async authenticate(email: string, password: string) {

        const {status, user} = await UsersServices.findByEmail(email);

        if(!status) {
            return { message: "User doesn't exist"};
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return {message: "Incorrect password"}
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d'});

        delete user.password;

        return {user, token};

    }
}

export default new AuthServices();