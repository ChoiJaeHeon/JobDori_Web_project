import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    private readonly logger = new Logger(GoogleStrategy.name);
    constructor() {
        super({
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        this.logger.log('google oauth2 validate');
        const { displayName, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            name: displayName,
            picture: photos[0].value,
            // accessToken,
        };
        done(null, user);
    }
}
