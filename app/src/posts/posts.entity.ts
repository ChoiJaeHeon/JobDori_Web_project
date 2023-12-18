import { Board } from 'src/board/board.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity({ name: 'posts', schema: 'public' })
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.posts)
    user: User;

    @ManyToOne((type) => Board, (board) => board.posts)
    board: Board;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    title: string;

    @Column({ nullable: false })
    @IsString()
    @IsNotEmpty()
    content: string;

    @CreateDateColumn({ type: 'timestamptz' })
    postDate: Date;

    @Column({ nullable: true })
    @IsString()
    imageUrl: string;

    @OneToMany((type) => Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    })
    comments: Comment[];

    constructor(partial: Partial<Posts>) {
        Object.assign(this, partial);
    }
}
