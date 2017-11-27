import {Body, Controller, Delete, Get, Inject, Put, Req, Res} from '@nestjs/common';

import {FeatureToggle} from './interfaces';
import DbProvider from './db.provider';


@Controller()
export class AppController {

    constructor(@Inject('DB') private db: DbProvider) {

    }

    @Get()
    public root(@Res() response) {
        this.db.getFeatureToggles()
            .then((res) => {
                response.send(res);
            });
    }

    @Get('/feature-toggles')
    public getFeatureToggles(@Res() response) {
        this.db.getFeatureToggles()
            .then((res) => {
                response.send(res);
            });
    }

    @Get('/feature-toggles/:toggleID')
    public getFeatureToggleById(@Req() request) {

    }

    @Delete('/feature-toggles/:toggleID')
    public removeFeatureToggleById(@Req() request) {

    }

    @Put('/feature-toggles')
    public createFeatureToggle(@Body() featureToggle: FeatureToggle) {

    }


}
