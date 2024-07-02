import { Module } from '@nestjs/common';
import { SMSService } from './sms.service';
import { SmsController } from './sms.controller';

@Module({
  controllers: [SmsController],
  providers: [SMSService],
  exports: [SMSService],
})
export class SmsModule {}
