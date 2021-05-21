import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxieGraphqlService } from 'src/axie-graphql/axie-graphql.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AxieGraphqlService],
})
export class AppModule {}
