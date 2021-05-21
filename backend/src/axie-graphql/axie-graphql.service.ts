import { Injectable } from '@nestjs/common';

import { GraphqlQuery } from 'src/interfaces/graphql_query.interface';

@Injectable()
export class AxieGraphqlService {
    private readonly  graphqlURL: string = "https://axieinfinity.com/graphql-server-v2/graphql?"

    getQuery(): string{
        return this.graphqlURL
    }
}
