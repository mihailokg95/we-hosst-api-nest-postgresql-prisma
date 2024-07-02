import { Test, TestingModule } from '@nestjs/testing';
import { EMailService } from './e-mail.service';

describe('EMailService', () => {
  let service: EMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EMailService],
    }).compile();

    service = module.get<EMailService>(EMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
