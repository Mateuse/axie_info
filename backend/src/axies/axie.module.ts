import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AxiesService } from './axies.service';
import { Axie } from './axie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Axie])],
    providers: [AxiesService],
    controllers: [],
    exports: [AxiesService]
})
export class AxieModule{}