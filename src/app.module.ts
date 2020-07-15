import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {UserEntity} from "./user/user.entity";
import {PostModule} from './post/post.module';
import {PostEntity} from "./post/post.entity";
import { CommentModule } from './comment/comment.module';
import {CommentEntity} from "./comment/comment.entity";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            username: 'chris',
            password: 'chris',
            database: 'nesttest',
            entities: [UserEntity, PostEntity, CommentEntity],
            synchronize: true
        }),
        UserModule,
        PostModule,
        CommentModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
