import { PartialType } from '@nestjs/swagger';
import { CreateEMailDto } from './create-e-mail.dto';

export class UpdateEMailDto extends PartialType(CreateEMailDto) {}
