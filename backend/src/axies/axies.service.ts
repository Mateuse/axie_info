import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Axie } from './axie.entity'

@Injectable()
export class AxiesService {
    axies: Axie[] = [];

    constructor(@InjectRepository(Axie) private readonly axieRepository: MongoRepository<Axie>){}

    private getAllAxiesDB(): void{
        //not implemented
    }

    create(axie: Axie): void{
        this.axies.push(axie);
    }

    async saveAxies(): Promise<any>{
        try{
            await this.axieRepository.save(this.axies);
        }
        catch(e){
            console.log(e)
        }
    }

    getAllAxies(): Axie[]{
        return this.axies;
    }    
}
