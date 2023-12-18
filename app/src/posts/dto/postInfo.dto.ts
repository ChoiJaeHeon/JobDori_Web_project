import { IsDate, IsString } from 'class-validator';

export default class PostInfoDto {
    @IsString()
    author: string;

    @IsString()
    boardName: string;

    @IsString()
    title: string;

    @IsString()
    content: string;
}
