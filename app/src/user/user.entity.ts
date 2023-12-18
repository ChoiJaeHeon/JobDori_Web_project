import { Posts } from 'src/posts/posts.entity';
import { Comment } from 'src/comment/comment.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Board } from 'src/board/board.entity';

@Entity({ name: 'user', schema: 'public' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    name: string;

    @Column({ nullable: true })
    @IsString()
    email: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Column({ nullable: true })
    @IsString()
    profileUrl: string;

    @OneToMany((type) => Posts, (post) => post.user, { onDelete: 'CASCADE' })
    posts: Posts[];

    // 좋아요 기능 추가시
    // @OneToMany((type) => Post, (post) => post.user)
    // liked: Post[];

    @OneToMany((type) => Comment, (comment) => comment.user, {
        onDelete: 'CASCADE',
    })
    comments: Comment[];

    // 멘토링 / 스터디 게시판 확장용
    @OneToMany((type) => Board, (board) => board.user, { onDelete: 'CASCADE' })
    boards: Board[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
