import { IsDate, IsNumber, IsString } from 'class-validator';

export default class PostContentDto {
    @IsNumber()
    id: number;

    @IsString()
    author: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsDate()
    postDate: Date;
}
