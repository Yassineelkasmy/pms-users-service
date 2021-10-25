import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
    private nodemailerTransport: Mail;

    constructor() {
        this.nodemailerTransport = createTransport({
            host: "smtp.gmail.com",
            port:587,
            secure:true,
            auth: {
              user: "yassineelkasmy@gmail.com",
              pass: "ForUsGoogle123",
            }
        });
    }

    async sendMail(options: Mail.Options) {
        await this.nodemailerTransport.sendMail(options);
    }
}
