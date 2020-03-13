import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './products/products.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {UserEntity} from "./user/user.entity";
import {PostModule} from './post/post.module';
import {PostEntity} from "./post/post.entity";

@Module({
    imports: [
        ProductsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            username: 'chris',
            password: 'chris',
            database: 'nesttest',
            entities: [UserEntity, PostEntity],
            synchronize: true
        }),
        UserModule,
        PostModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
