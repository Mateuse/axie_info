import { Test, TestingModule } from '@nestjs/testing';
import { AxieGraphqlService } from './axie-graphql.service';

describe('AxieGraphqlService', () => {
  let service: AxieGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxieGraphqlService],
    }).compile();

    service = module.get<AxieGraphqlService>(AxieGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
