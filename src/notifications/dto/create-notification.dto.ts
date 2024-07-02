export class CreateNotificationDto {
  text?: string;
  html?: string;
  templateId?: string;
  to?: string;
  from?: string;
  subject?: string;
  userId: number;
  content: unknown;
}