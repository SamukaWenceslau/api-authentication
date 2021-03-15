import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { PasswordTokenRepository } from "../repositories/PasswordTokenRepository";

class SendMailServices {

    private client: Transporter

    constructor() {

        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;

        });

    }

    // If user exists, return token

    async validate(email: string) {
        
        const userRepository = getCustomRepository(UsersRepository);
        
        const passwordTokenRepository = getCustomRepository(PasswordTokenRepository);

        const {status, user} = await userRepository.findByEmail(email);

        if (!status) {
            return { status: false, message: "User doesn't exist!" };
        }

        const { token } = await passwordTokenRepository.findByToken(user.id);

        return {status: true, token};
    }

    // Send email 

    async execute(to: string, variables: object, path: string){

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to,
            subject: "Forgot Password",
            html,
            from: "Test <test@test.com.br>"
        })

        return {message: "Successfully email has been sent", url: nodemailer.getTestMessageUrl(message)}

    }

}

export default new SendMailServices();