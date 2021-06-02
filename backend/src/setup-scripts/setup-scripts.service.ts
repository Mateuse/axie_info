import { Injectable } from '@nestjs/common';
import { AxieGraphqlService } from 'src/axie-graphql/axie-graphql.service';

@Injectable()
export class SetupScriptsService {
    classes: string[] = ["Aquatic", "Beast", "Bird", "Bug", "Dawn", "Dusk", "Mech", "Plant", "Reptile"]
    stages: number[] = [4] //4 is adult
    
    constructor(private readonly axieGraphQlService: AxieGraphqlService) {}


    async populateDatabase(): Promise<any>{
        await this.axieGraphQlService.getAllAxies(undefined, undefined, undefined, undefined, [4], undefined, undefined, undefined, [this.classes[0]], 0);
    }
    test(): Promise<any>{
        return Promise.resolve().then(() => {
            return new Promise((resolve) => {
                console.log("IN")
                setTimeout(resolve, 1000);
            });            
        });
    }


}
