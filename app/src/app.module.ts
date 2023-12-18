import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';
import { Posts } from './posts/posts.entity';
import { Comment } from './comment/comment.entity';
import { Board } from './board/board.entity';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.POSTGRES_USER_ID,
            password: process.env.POSTGRES_USER_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Posts, Comment, Board],
            synchronize: true,
            useUTC: false,
        }),
        AuthModule,
        UserModule,
        BoardModule,
        CommentModule,
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
