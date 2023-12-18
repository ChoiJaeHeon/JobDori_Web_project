import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BoardCategory } from '../boardCategory.enum';

export default class BoardInfoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsEnum(BoardCategory)
    category: BoardCategory;
}
