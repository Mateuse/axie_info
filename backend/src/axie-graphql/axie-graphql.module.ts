import { Module, HttpModule } from '@nestjs/common';
import { AxieModule } from '../axies/axie.module';
import { AxieGraphqlService } from './axie-graphql.service';

@Module({
    imports: [AxieModule, HttpModule],
    providers: [AxieGraphqlService],
    controllers: [],
    exports: [AxieGraphqlService]
})
export class AxieGraphqlModule{}