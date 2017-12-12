import * as MongoDB from 'mongodb';
import {FeatureToggle, FeatureToggleUpdate} from './interfaces';

const MongoClient = MongoDB.MongoClient;
const url = 'mongodb://featuretoggle:jS8A1OrROWpPkV39i@ds121716.mlab.com:21716/featuretoggle';
const FEATURE_TOGGLES_COLLECTION = 'featuretoggles';

export default class DbProvider {
    async getDBConnection(): Promise<any> {
        return MongoClient.connect(url)
            .then((db) => {
                return Promise.resolve(db);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };

    async getFeatureToggles(): Promise<Array<FeatureToggle>> {
        const db = await this.getDBConnection();

        let collection = db.collection(FEATURE_TOGGLES_COLLECTION);
        return collection.find({}).toArray()
            .then((result) => {
                return Promise.resolve(result);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    async getFeatureToggleById(id: string): Promise<FeatureToggle> {
        const db = await this.getDBConnection();
        let collection = db.collection(FEATURE_TOGGLES_COLLECTION);
        return collection.find({toggleId: id}).toArray()
            .then((result) => {
                return Promise.resolve(result[0]);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    async updateFeatureToggle(id: string, update: FeatureToggleUpdate): Promise<void> {
        const db = await this.getDBConnection();
        let collection = db.collection(FEATURE_TOGGLES_COLLECTION);
        return collection.updateOne({toggleId: id}, {
            isActivated: update.isActivated,
            activeInVersion: update.activeInVersion,
            toggleType: update.toggleType
        })
            .then(() => {
                return Promise.resolve();
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    async addNewFeatureToggle(featureToggle: FeatureToggle): Promise<void> {
        const db = await this.getDBConnection();
        let collection = db.collection(FEATURE_TOGGLES_COLLECTION);
        return collection.insertOne(featureToggle)
            .then(() => {
                return Promise.resolve();
            }).catch((error) => {
                return Promise.reject(error);
            });
    }

    async removeFeatureToggleById(id: string): Promise<void> {
        const db = await this.getDBConnection();
        let collection = db.collection(FEATURE_TOGGLES_COLLECTION);
        return collection.deleteOne({toggleId: id})
            .then(() => {
                return Promise.resolve();
            }).catch((error) => {
                return Promise.reject(error);
            });
    }

}