import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Board } from '../board.entity';
import { BoardCategory } from '../boardCategory.enum';

export class BoardContentDto {
    @IsNumber()
    id: number;

    @IsString()
    boardName: string;

    @IsString()
    description: string;

    @IsString()
    author: string;

    @IsEnum(BoardCategory)
    category: BoardCategory;

    @IsDate()
    createdAt: Date;

    constructor(partial) {
        Object.assign(this, partial);
    }
}
