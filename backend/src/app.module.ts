import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxieGraphqlModule } from './axie-graphql/axie-graphql.module';
import { ConfigModule } from '@nestjs/config';
import { AxiesService } from './axies/axies.service';
import { AxieModule } from './axies/axie.module'; 
import { Axie } from './axies/axie.entity';
import { SetupScriptsController } from './setup-scripts/setup-scripts.controller';
import { SetupScriptsService } from './setup-scripts/setup-scripts.service';
import { SetupScriptsModule } from './setup-scripts/setup-scripts.module';

@Module({
  imports: [ ConfigModule.forRoot({ envFilePath: './ENV/.development.env' }),
             TypeOrmModule.forRoot({
               type: 'mongodb',
               database: 'axie-info',
               url: process.env.MONGODB_CONNECTION_STRING,
               useNewUrlParser: true,
               useUnifiedTopology: true,
               keepConnectionAlive: true,
               entities: [
                __dirname + '/**/*.entity{.ts,.js}',
               ]
             }), HttpModule, AxieModule, AxieGraphqlModule, SetupScriptsModule],
  controllers: [AppController, SetupScriptsController],
  providers: [AppService, SetupScriptsService],
})
export class AppModule {}
