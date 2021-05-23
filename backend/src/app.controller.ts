import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AxieGraphqlService } from 'src/axie-graphql/axie-graphql.service';

@Controller()
export class AppController {
  constructor(private readonly AxieGraphqlService: AxieGraphqlService) {}

  @Get()
  getQuery(): string {
    this.AxieGraphqlService.searchMarketPlace();
    return "OK"
  }
}
