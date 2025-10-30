import { EMailService } from './e-mail.service';
import { Controller, Post, Query } from '@nestjs/common';

@Controller('mail')
export class EMailController {
  constructor(private readonly emailService: EMailService) {}

  // Here we use query parameter to get the email that we want to send
  @Post()
  async sendEmail(@Query('email') email: string) {
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      // from: 'office@hosst.ai', // Fill it with your validated email on SendGrid account
      from: 'greatfreight17@hotmail.com', // Fill it with your validated email on SendGrid account
      text: 'NINDZAAAAAAA',
      html: '<h1>NINDZAAAAAAA</h1>',
    };
    try {
      const email = await this.emailService.send(mail);
      return email;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('verify')
  async verify() {
    return await this.emailService.verify();
  }
}
