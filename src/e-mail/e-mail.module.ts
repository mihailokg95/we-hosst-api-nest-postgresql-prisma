import { Module } from '@nestjs/common';
import { EMailService } from './e-mail.service';
import { EMailController } from './e-mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [ConfigModule],
  controllers: [EMailController],
  providers: [EMailService, MailService],
  exports: [EMailService],
})
export class EMailModule {}
