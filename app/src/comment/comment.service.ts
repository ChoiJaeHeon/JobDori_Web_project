import { Injectable, Logger } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import CommentInfoDto from './dto/commentInfo.dto';
import { UserService } from 'src/user/user.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentService {
    private readonly logger = new Logger(CommentService.name);
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: CommentRepository,
        private readonly userSerivce: UserService,
        private readonly postsService: PostsService,
    ) {}

    async createComment(
        userId: number,
        commentInfoDto: CommentInfoDto,
        postId: number,
    ): Promise<void> {
        const author = await this.userSerivce.findUserById(userId);
        const post = await this.postsService.getPostById(postId);
        if (author === undefined || post === undefined) {
            throw new Error('존재하지 않는 사용자 또는 게시글');
        }

        const comment: Comment = new Comment({
            user: author,
            post: post,
            commentText: commentInfoDto.content,
        });
        console.log(comment);
        await this.commentRepository.save(comment);
    }

    async getCommentById(commentId: number): Promise<Comment> {
        return await this.commentRepository.findOne({
            where: { id: commentId },
            relations: ['user', 'post'],
        });
    }

    async updateComment(
        userId: number,
        commentInfoDto: CommentInfoDto,
        commentId: number,
    ): Promise<void> {
        const comment: Comment = await this.getCommentById(commentId);
        if (!comment) throw new Error('존재하지 않는 댓글입니다.');
        if (comment.user.id !== userId) {
            throw new Error('댓글 작성자가 아닙니다.');
        }
        comment.commentText = commentInfoDto.content;
        await this.commentRepository.save(comment);
    }

    async deleteComment(userId: number, commentId: number): Promise<void> {
        const comment: Comment = await this.getCommentById(commentId);
        if (!comment) throw new Error('존재하지 않는 댓글입니다.');
        if (comment.user.id !== userId) {
            throw new Error('댓글 작성자가 아닙니다.');
        }
        await this.commentRepository.delete({ id: commentId });
    }
}
