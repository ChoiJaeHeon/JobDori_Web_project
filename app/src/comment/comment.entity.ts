import { IsNotEmpty } from 'class-validator';
import { Posts } from 'src/posts/posts.entity';
import { User } from 'src/user/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'comment', schema: 'public' })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Posts, (post) => post.comments)
    post: Posts;

    @ManyToOne((type) => User, (user) => user.comments)
    user: User;

    @Column({ nullable: false })
    @IsNotEmpty()
    commentText: string;

    @CreateDateColumn({ type: 'timestamptz' })
    commentDate: Date;

    constructor(partial: Partial<Comment>) {
        Object.assign(this, partial);
    }
}
