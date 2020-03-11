import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {UserEntity} from "./user/user.entity";

@Module({
    imports: [
        ProductsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            username: 'chris',
            password: 'chris',
            database: 'nesttest',
            entities: [UserEntity],
            synchronize: true
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
