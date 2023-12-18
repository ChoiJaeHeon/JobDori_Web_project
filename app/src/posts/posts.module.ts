import { Module } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Posts } from './posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { UserService } from 'src/user/user.service';
import { BoardService } from 'src/board/board.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Board } from 'src/board/board.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Comment, Posts, Board]),
        JwtModule,
    ],
    controllers: [PostsController],
    providers: [PostsService, JwtAuthGuard, UserService, BoardService],
    exports: [PostsService],
})
export class PostsModule {}
