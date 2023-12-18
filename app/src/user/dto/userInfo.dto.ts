import { IsNotEmpty, IsString } from 'class-validator';

export default class UserInfoDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsString()
    profileUrl: string;
}
