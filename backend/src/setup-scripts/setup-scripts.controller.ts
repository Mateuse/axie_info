import { Controller, Get } from '@nestjs/common';
import { SetupScriptsService } from './setup-scripts.service';

@Controller('setup-scripts')
export class SetupScriptsController {
    constructor(private readonly setupScriptService: SetupScriptsService){}

    @Get()
    getQuery(): string {
        this.setupScriptService.populateDatabase();
        return "ok"
    }
}
