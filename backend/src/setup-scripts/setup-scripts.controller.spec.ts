import { Test, TestingModule } from '@nestjs/testing';
import { SetupScriptsController } from './setup-scripts.controller';

describe('SetupScriptsController', () => {
  let controller: SetupScriptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetupScriptsController],
    }).compile();

    controller = module.get<SetupScriptsController>(SetupScriptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
