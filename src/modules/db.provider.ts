import * as MongoDB from 'mongodb';

const MongoClient = MongoDB.MongoClient;
const url = 'mongodb://featuretoggle:jS8A1OrROWpPkV39i@ds121716.mlab.com:21716/featuretoggle';

export default class DbProvider {
    async connectDB(): Promise<any> {
        return new Promise(((resolve, reject) => {
            MongoClient.connect(url)
                .then((db) => {
                    resolve(db);
                })
                .catch((error) => {
                    reject(error);
                });
        }));
    };

    async getFeatureToggles(): Promise<any> {
        const db = await this.connectDB();

        let collection = db.collection('featuretoggles');
        return collection.find({}).toArray()
            .then((result) => {
                console.log('FeatureToggles: ', result);
                return Promise.resolve(result);
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

}