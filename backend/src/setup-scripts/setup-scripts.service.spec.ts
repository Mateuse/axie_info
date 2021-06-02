import { Test, TestingModule } from '@nestjs/testing';
import { SetupScriptsService } from './setup-scripts.service';

describe('SetupScriptsService', () => {
  let service: SetupScriptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetupScriptsService],
    }).compile();

    service = module.get<SetupScriptsService>(SetupScriptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
