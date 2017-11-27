import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import DbProvider from './db.provider';

const connectionFactory = {
    provide: 'DB',
    useFactory: () => {
        return new DbProvider();
    }
};

@Module({
    modules: [],
    controllers: [AppController],
    components: [connectionFactory]
})
export class ApplicationModule {
}
