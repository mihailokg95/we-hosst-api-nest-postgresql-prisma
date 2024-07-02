// src/sms/sms.service.ts
import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { CreateSmDto } from './dto/create-sms.dto';

@Injectable()
export class SMSService {
  private readonly client;

  constructor() {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSms(smsBody: CreateSmDto) {
    // Look up user phone number based on userId
    // Use SMS gateway SDK to send message
  }
}
