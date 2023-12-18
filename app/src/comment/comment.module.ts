import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { User } from 'src/user/user.entity';
import { Posts } from 'src/posts/posts.entity';
import { UserService } from 'src/user/user.service';
import { PostsService } from 'src/posts/posts.service';
import { BoardModule } from 'src/board/board.module';
import { Board } from 'src/board/board.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment, User, Posts, Board]),
        JwtModule,
        BoardModule,
    ],
    controllers: [CommentController],
    providers: [
        CommentService,
        CommentRepository,
        JwtAuthGuard,
        UserService,
        PostsService,
    ],
    exports: [CommentService, CommentRepository],
})
export class CommentModule {}
