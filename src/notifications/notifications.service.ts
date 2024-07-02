import { Injectable } from '@nestjs/common';
import { SMSService } from '../sms/sms.service';
import { EMailService } from 'src/e-mail/e-mail.service';
import { UsersService } from 'src/users/users.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private emailService: EMailService,
    private smsService: SMSService,
    private usersService: UsersService,
  ) {}

  async sendNotification(notificationDto: CreateNotificationDto) {
    const user = await this.usersService.getUserById(notificationDto.userId);

    if (user.notificationPreferences) {
      // Send email
      this.emailService.send({
        to: user.email,
        subject: 'Hello from sendgrid',
        from: 'office@hosst.ai', // Fill it with your validated email on SendGrid account
        text: 'Hello',
        html: '<h1>Hello</h1>',
      });
    }

    if (user.notificationPreferences) {
      // Send SMS
      this.smsService.sendSms({
        userId: user.id,
        message: 'Hello from sms',
      });
    }

    // Add push notifications later on if needed
  }
}
