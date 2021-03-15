import { Request, Response } from 'express';
import { resolve } from 'path';
import SendMailServices from '../services/SendMailServices';


class SendMailController {

    async execute(request: Request, response: Response) {
        
        const { email } = request.body;

        const path = resolve(__dirname, "..", "view", "mail.hbs");

        const res = await SendMailServices.validate(email);

        if(!res.status) {
            return response.status(406).json({message: res.message});
        }

        const variables = {
            link: process.env.URL_MAIL,
            token: res.token
        }

        const mailSent = await SendMailServices.execute(email, variables, path);

        return response.status(200).json(mailSent);

    }

}

export default new SendMailController();