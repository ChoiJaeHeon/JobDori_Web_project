import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Posts } from '../posts/posts.entity';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';
import { BoardCategory } from './boardCategory.enum';

@Entity({ name: 'board', schema: 'public' })
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsString()
    description: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdDate: Date;

    @Column({ default: false })
    isPredefined: boolean; // true for predefined boards, false for dynamically generated boards

    @ManyToOne((type) => User, (user) => user.boards)
    user: User;

    @IsArray()
    accessible: number[];

    @OneToMany((type) => Posts, (post) => post.board, { onDelete: 'CASCADE' })
    posts: Posts[];

    @IsEnum(BoardCategory)
    category: BoardCategory;

    constructor(partial: Partial<Board>) {
        Object.assign(this, partial);
    }
}
