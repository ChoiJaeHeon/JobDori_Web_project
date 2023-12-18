import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateOAuthLogin(user: JSON): Promise<User> {
        // 이미 존재하는 유저인지 검사 -> 없으면 생성
        console.log(user);
        const found: User = await this.userService.findUserByUsername(
            user['name'],
        );
        console.log(found);
        if (found === null || found === undefined) {
            const newUser = await this.userService.createUser(user);
            console.log(newUser);
            return newUser;
        }
        return found;
    }

    createAccessToken(user: User): string {
        const payload = { sub: user.id, username: user.name };
        const newJwt: string = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_KEY,
        });
        return newJwt;
    }
}
