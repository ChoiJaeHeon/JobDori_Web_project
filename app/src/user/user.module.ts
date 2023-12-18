import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Posts } from 'src/posts/posts.entity';
import { Comment } from 'src/comment/comment.entity';
import { CommentModule } from 'src/comment/comment.module';
import { PostsModule } from 'src/posts/posts.module';
import { Board } from 'src/board/board.entity';
import { UserController } from './user.controller';
import { BoardModule } from 'src/board/board.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Comment, Posts, Board]),
        JwtModule,
        PostsModule,
        CommentModule,
        BoardModule,
    ],
    controllers: [UserController],
    providers: [UserService, JwtAuthGuard],
    exports: [UserService],
})
export class UserModule {}
