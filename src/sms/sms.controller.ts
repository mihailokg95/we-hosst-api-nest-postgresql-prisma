import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SMSService } from './sms.service';
import { CreateSmDto } from './dto/create-sms.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SMSService) {}

  @Post()
  create(@Body() createSmDto: CreateSmDto) {
    return this.smsService.sendSms(createSmDto);
  }
}
