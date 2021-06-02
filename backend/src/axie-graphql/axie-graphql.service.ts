import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { Axie } from '../axies/axie.entity';
import { Part } from '../interfaces/parts.interface';
import { GraphqlQuery } from 'src/interfaces/graphql_query.interface';
import { AxiesService } from '../axies/axies.service';

@Injectable()
export class AxieGraphqlService {
    classes: string[] = ["Aquatic", "Beast", "Bird", "Bug", "Dawn", "Dusk", "Mech", "Plant", "Reptile"]
    private readonly  graphqlURL: string = "https://axieinfinity.com/graphql-server-v2/graphql"
    private readonly logger = new Logger(AxieGraphqlService.name)
    private requestStack: any = []

    constructor(private readonly http: HttpService, private readonly axieService: AxiesService){}

    async getAllAxies(auctionType:string="All", region:string=null, parts:string[]=null, bodyShapes:string[]=null, stages:number[]=null,
                      numMystic:number[]=null, breedCount:number[]=null, breedable:boolean=null, classes:string[]=null, class_num:number=null): Promise<string>{
        console.log(this.classes);
        let json_query = {
            "query": `{axies(auctionType: ${auctionType}, criteria: {region: ${region}, parts: ${parts}, bodyShapes: ${bodyShapes}, stages: ${stages}, numMystic: ${numMystic}, breedCount: ${breedCount}, breedable: ${breedable}, classes: ${classes},}, from: 0, size: 100) {total, results{id, name, class, breedCount, image, title, battleInfo  {banned, __typename}, auction {currentPrice, currentPriceUSD, __typename}, parts {id, name, class, type, specialGenes, __typename}, __typename} } }`
        }
        if(class_num != null){
            class_num = class_num < this.classes.length ? class_num + 1 : null;
        }
            
        return await this.http.post(`${this.graphqlURL}`,JSON.stringify(json_query),{ headers: { 'Content-Type': 'application/json' }} )
            .toPromise().then(res => {
                res.data.data.axies.results.forEach(a => {
                    let axie: Axie = {
                        _id: a['id'],
                        name: a['name'],
                        class: a['class'],
                        image: a['image'],
                        auction: a['auction'],
                        title: a['title'],
                        breedCount: a['breedCount'],
                        parts: a['parts']
                    }
                    this.axieService.create(axie);
                });                
                for(let x=100; x < res.data.data.axies.total; x+=100){
                    let json_query = {
                        "query": `{axies(auctionType: All, criteria: {region: ${region}, parts: ${parts}, bodyShapes: ${bodyShapes}, stages: ${stages}, numMystic: ${numMystic}, breedCount: ${breedCount}, breedable: ${breedable}, classes: ${classes},}, from: ${x}, size: 100) {total, results{id, name, class, breedCount, image, title, battleInfo  {banned, __typename}, auction {currentPrice, currentPriceUSD, __typename}, parts {id, name, class, type, specialGenes, __typename}, __typename} } }`
                    }                        
                    this.requestStack.push(json_query);         
                    //10000 is the max graphql query allowed by axie infinity
                    //Everything above 10000 returns an empty array
                    if(x == 10000){
                        break;
                    }
                }  

                let promise = Promise.resolve();
                this.requestStack.forEach(query => {
                    promise = promise.then(async () => {                    
                        await this.getAxiesBy100(query);     
                        console.log(`${class_num}`);            
                        return new Promise((resolve) => {
                            setTimeout(resolve, 2000);
                        });
                    });          
                });

                promise.then(async () => {
                    console.log(this.axieService.axies.length);                    
                    await this.axieService.saveAxies();
                    if(class_num != null){
                        await this.getAllAxies(undefined, undefined, undefined, undefined, [4], undefined, undefined, undefined, [this.classes[class_num]], class_num);
                    }
                });                     
            },
                err => {
                    this.logger.error(err);
                    return err
                }
            );           
            
    }



    async getAxiesBy100(query): Promise<any>{
        await this.http.post(`${this.graphqlURL}`,JSON.stringify(query),{ headers: { 'Content-Type': 'application/json' }} )
            .toPromise().then(res => {
                res.data.data.axies.results.forEach(async a => {
                    let axie: Axie = {
                        _id: a['id'],
                        name: a['name'],
                        class: a['class'],
                        image: a['image'],
                        auction: a['auction'],
                        title: a['title'],
                        breedCount: a['breedCount'],
                        parts: a['parts']
                    }
                    await this.axieService.create(axie);
                });
            },
            err => {
                console.log(err)
                this.logger.error(err);
                return err
            }
        );            
    }
}
