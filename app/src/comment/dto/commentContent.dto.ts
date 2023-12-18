import { IsDate, IsString } from 'class-validator';

export default class CommentContentDto {
    @IsString()
    author: string;

    @IsString()
    content: string;

    @IsDate()
    commentDate: Date;
}
