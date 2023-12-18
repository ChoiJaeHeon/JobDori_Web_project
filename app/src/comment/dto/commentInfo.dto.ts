import { IsDate, IsString } from 'class-validator';

export default class CommentInfoDto {
    @IsString()
    author: string;

    @IsString()
    boardName: string;

    @IsString()
    postTitle: string;

    @IsString()
    content: string;
}
