import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req, Res} from '@nestjs/common';

import {FeatureToggle} from './interfaces';
import DbProvider from './db.provider';


@Controller()
export class AppController {

    constructor(@Inject('DB') private db: DbProvider) {

    }

    @Get('/feature-toggles')
    public getFeatureToggles(@Res() response) {
        this.db.getFeatureToggles()
            .then((res) => {
                response.send(res);
            });
    }

    @Get('/feature-toggles/:toggleID')
    public getFeatureToggleById(@Param('toggleID') toggleID, @Res() response) {
        this.db.getFeatureToggleById(toggleID)
            .then((featureToggle) => {
                response.send(featureToggle);
            });
    }

    @Delete('/feature-toggles/:toggleID')
    public removeFeatureToggleById(@Param('toggleID') toggleID, @Res() response) {
        this.db.removeFeatureToggleById(toggleID)
            .then(() => {
                response.sendStatus(200);
            });
    }

    @Put('/feature-toggles/:toggleID')
    public updateFeatureToggle(@Param('toggleID') toggleID, @Body() featureToggle: FeatureToggle, @Res() response) {
        console.log('add new feature toggle:', featureToggle);
        delete featureToggle.toggleId;
        this.db.updateFeatureToggle(toggleID, featureToggle)
            .then(() => {
                response.sendStatus(200);
            })
            .catch((error) => {
                response.send(400, error);
            });
    }

    @Post('/feature-toggles')
    public createFeatureToggle(@Body() featureToggle: FeatureToggle, @Res() response) {
        console.log('add new feature toggle:', featureToggle);
        this.db.addNewFeatureToggle(featureToggle)
            .then(() => {
                response.sendStatus(201);
            })
            .catch((error) => {
                response.send(400, error);
            });
    }


}
