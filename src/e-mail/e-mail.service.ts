import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { ClientResponse, MailDataRequired } from '@sendgrid/mail';
import * as Twilio from 'twilio'
@Injectable()
export class EMailService {
  private readonly logger = new Logger(EMailService.name);
  private readonly client;
  constructor(
    private readonly configService: ConfigService,
  ) {
    // Don't forget this one.
    // The apiKey is required to authenticate our
    // request to SendGrid API.
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    this.client = Twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async send(mail: MailDataRequired): Promise<[ClientResponse, object]> {
    try {
      const clientResponse = await SendGrid.send(mail);
      this.logger.log(`E-Mail sent to ${mail.to}`);
      return clientResponse;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error.message);
    }
  }

  async verify() {

    this.client.verify.v2
      .services('VA7820431bd1cb2865fc968911d3d885ed')
      .verificationChecks.create({ to: '+381604489311', code: '[Code]' })
      .then((verification_check) => console.log(verification_check.status));
  }
  async sendVerificationCodeToPhone(phone: string, code: string) {
    this.client.verify.v2
      .services('VA7820431bd1cb2865fc968911d3d885ed')
      .verifications.create({ to: phone, channel: 'sms' })
      .then((verification) => console.log(verification.sid));
  }
}
