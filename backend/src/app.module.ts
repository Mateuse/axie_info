import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxieGraphqlService } from './axie-graphql/axie-graphql.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({ envFilePath: './ENV/.development.env' }),
             TypeOrmModule.forRoot({
               type: 'mongodb',
               url: process.env.MONGODB_CONNECTION_STRING,
               useNewUrlParser: true,
               useUnifiedTopology: true,
               keepConnectionAlive: true
             })],
  controllers: [AppController],
  providers: [AppService, AxieGraphqlService],
})
export class AppModule {}
