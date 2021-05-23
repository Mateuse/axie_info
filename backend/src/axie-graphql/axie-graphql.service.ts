import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { GraphqlQuery } from 'src/interfaces/graphql_query.interface';

@Injectable()
export class AxieGraphqlService {
    private readonly  graphqlURL: string = "https://axieinfinity.com/graphql-server-v2/graphql"
    private readonly logger = new Logger(AxieGraphqlService.name)

    constructor(private readonly http: HttpService){}

    async searchMarketPlace(region:string=null, parts:string[]=null, bodyShapes:string[]=null, stages:number[]=null,
                      numMystic:number[]=null, breedCount:number[]=null, breedable:boolean=null, classes:string[]=null): Promise<any>{

        let json_query = {
            "query": `{axies(auctionType: Sale, criteria: {region: ${region}, parts: ${parts}, bodyShapes: ${bodyShapes}, stages: ${stages}, numMystic: ${numMystic}, breedCount: ${breedCount}, breedable: ${breedable}, classes: ${classes},}, from: 0) {total, results{id, name, class, breedCount, image, title, battleInfo  {banned, __typename}, auction {currentPrice, currentPriceUSD, __typename}, parts {id, name, class, type, specialGenes, __typename}, __typename} } }`
        }

        console.log(JSON.stringify(json_query))
        
        this.http.post(`${this.graphqlURL}`,JSON.stringify(json_query),{ headers: { 'Content-Type': 'application/json' }} )
            .toPromise().then(res => {
                console.log(res.data)
            },
                err => {
                    console.log(err)
                    this.logger.error(err);
                    return err
                }
            )
            
    }
}
