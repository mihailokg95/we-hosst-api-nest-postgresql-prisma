import { Test, TestingModule } from '@nestjs/testing';
import { EMailController } from './e-mail.controller';
import { EMailService } from './e-mail.service';

describe('EMailController', () => {
  let controller: EMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EMailController],
      providers: [EMailService],
    }).compile();

    controller = module.get<EMailController>(EMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
