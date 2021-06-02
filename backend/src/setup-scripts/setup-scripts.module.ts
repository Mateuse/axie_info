import { Module } from '@nestjs/common';
import { AxieGraphqlModule } from 'src/axie-graphql/axie-graphql.module';
import { SetupScriptsController } from './setup-scripts.controller';
import { SetupScriptsService } from './setup-scripts.service';
@Module({
    imports: [AxieGraphqlModule],
    providers: [SetupScriptsService],
    controllers: [SetupScriptsController],
    exports: [SetupScriptsService]
})
export class SetupScriptsModule {}
