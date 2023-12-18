import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    private readonly logger = new Logger(KakaoStrategy.name);
    constructor() {
        super({
            clientID: process.env.OAUTH_KAKAO_ID,
            clientSecret: process.env.OAUTH_KAKAO_SECRET,
            callbackURL: process.env.OAUTH_KAKAO_REDIRECT,
            scope: ['profile_nickname', 'profile_image'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
    ): Promise<any> {
        this.logger.log('kakao oauth2 validate');
        const displayName = profile['displayName'];
        const thumbnailImage =
            profile['_json']['properties']['thumbnail_image'];
        const user = {
            name: displayName,
            picture: thumbnailImage,
            // accessToken,
        };
        done(null, user);
    }
}
