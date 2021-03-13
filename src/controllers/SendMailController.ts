import { Request, Response } from 'express';
import { resolve } from 'path';
import PasswordTokenServices from '../services/PasswordTokenServices';
import SendMailServices from '../services/SendMailServices';
import UsersServices from '../services/UsersServices';

class SendMailController {

    async execute(request: Request, response: Response) {
        const { email } = request.body;

        const userExists = await UsersServices.findByEmail(email);

        if (!userExists.status) {
            return response.json({ message: "User doesn't exist!" });
        }

        const path = resolve(__dirname, "..", "view", "mail.hbs");

        const token = await PasswordTokenServices.findByToken(userExists.user.id);

        const variables = {
            link: process.env.URL_MAIL,
            token
        }

        await SendMailServices.execute(email, variables, path);

        return response.json({ email, variables, path });

    }

}

export default new SendMailController();