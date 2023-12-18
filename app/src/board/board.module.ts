import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Posts } from 'src/posts/posts.entity';
import { UserService } from 'src/user/user.service';
import { Comment } from 'src/comment/comment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, User, Posts, Comment]),
        JwtModule,
    ],
    controllers: [BoardController],
    providers: [BoardService, BoardRepository, JwtAuthGuard, UserService],
    exports: [BoardService],
})
export class BoardModule {}
