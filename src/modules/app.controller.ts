import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Res} from '@nestjs/common';

import {FeatureToggle} from './interfaces';
import DbProvider from './db.provider';


@Controller()
export class AppController {

    constructor(@Inject('DB') private db: DbProvider) {

    }

    @Get('/feature-toggles')
    public async getFeatureToggles(@Res() response) {
        const toggle = await this.db.getFeatureToggles();
        response.send(toggle);
    }

    @Get('/feature-toggles/:toggleID')
    public async getFeatureToggleById(@Param('toggleID') toggleID, @Res() response) {
        const featureToggle = await this.db.getFeatureToggleById(toggleID);
        response.send(featureToggle);
    }

    @Delete('/feature-toggles/:toggleID')
    public async removeFeatureToggleById(@Param('toggleID') toggleID, @Res() response) {
        await this.db.removeFeatureToggleById(toggleID);
        response.sendStatus(200);
    }

    @Put('/feature-toggles/:toggleID')
    public async updateFeatureToggle(@Param('toggleID') toggleID, @Body() featureToggle: FeatureToggle, @Res() response) {
        console.log('add new feature toggle:', featureToggle);
        delete featureToggle.toggleId;
        try {
            await this.db.updateFeatureToggle(toggleID, featureToggle);
            response.sendStatus(200);
        }
        catch (error) {
            response.send(400, error);
        }
    }

    @Post('/feature-toggles')
    public async createFeatureToggle(@Body() featureToggle: FeatureToggle, @Res() response) {
        console.log('add new feature toggle:', featureToggle);
        try {
            await this.db.addNewFeatureToggle(featureToggle);
            response.sendStatus(201);
        }
        catch (error) {
            response.send(400, error);
        }
    }


}
