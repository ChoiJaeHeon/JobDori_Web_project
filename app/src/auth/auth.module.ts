import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Posts } from 'src/posts/posts.entity';
import { Comment } from 'src/comment/comment.entity';
import { Board } from 'src/board/board.entity';
import { KakaoStrategy } from './kakao.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Posts, Comment, Board]),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        KakaoStrategy,
        AuthService,
        JwtService,
        UserService,
    ],
})
export class AuthModule {}
