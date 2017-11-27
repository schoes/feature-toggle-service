import {Body, Controller, Delete, Get, Put, Req} from '@nestjs/common';
import * as assert from 'assert';
import * as Mongo from 'mongodb';
import {FeatureToggle} from './interfaces';

const MongoClient = Mongo.MongoCLient;
const url = 'ds121716.mlab.com:21716/featuretoggle';

@Controller()
export class AppController {

    constructor() {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log('Connected successfully to server');

            db.close();
        });
    }

    @Get()
    public root(): Array<FeatureToggle> {
        return this.getFeatureToggles();
    }

    @Get('/feature-toggles')
    public getFeatureToggles(): Array<FeatureToggle> {
        let toggles: Array<FeatureToggle> = [];
        MongoClient.connect()
            .then((db) => {
                let collection = db.collection('featuretoggles');
                collection.fin({}).toArray()
                    .then((result) => {
                        toggles = result;
                    })
                    .catch((error) => {
                        console.error(error);
                        return [];
                    });
            })
            .catch((error) => {
                console.error(error);
                return [];
            });
        // TODO remove when promise is ready
        return [];
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
