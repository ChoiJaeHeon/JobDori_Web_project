import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(): Promise<void> {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req, @Res() res): Promise<void> {
        this.logger.log('googleAuthCallback');
        const user: User = await this.authService.validateOAuthLogin(req.user);
        // jwt 토큰 생성 및 쿠키 설정
        const access_token = this.authService.createAccessToken(user);
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).redirect(process.env.BACK_ADDR);
    }

    @Get('kakao')
    @UseGuards(AuthGuard('kakao'))
    async kakaoAuth(): Promise<void> {}

    @Get('kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    async kakaoAuthCallback(@Req() req, @Res() res): Promise<void> {
        this.logger.log('kakaoAuthCallback');
        const user: User = await this.authService.validateOAuthLogin(req.user);
        // jwt 토큰 생성 및 쿠키 설정
        const access_token = this.authService.createAccessToken(user);
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).redirect(process.env.BACK_ADDR);
    }
}
