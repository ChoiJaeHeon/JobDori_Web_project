import { Injectable, Logger } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import PostInfoDto from './dto/postInfo.dto';
import PostContentDto from './dto/postContent.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { Board } from 'src/board/board.entity';
import { BoardService } from 'src/board/board.service';
import CommentContentDto from 'src/comment/dto/commentContent.dto';

@Injectable()
export class PostsService {
    private readonly logger = new Logger(PostsService.name);
    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: PostsRepository,
        private readonly userService: UserService,
        private readonly boardService: BoardService,
    ) {}

    async createPost(userId: number, postInfoDto: PostInfoDto): Promise<Posts> {
        const { author, boardName, content, title } = postInfoDto;
        const user: User = await this.userService.findUserById(userId);
        const board: Board = await this.boardService.getBoardByName(boardName);
        if (!user || !board)
            throw new Error('존재하지 않는 사용자 또는 게시판');
        const post = new Posts({
            title: title,
            content: content,
            user: user,
            board: board,
        });

        return await this.postsRepository.save(post);
    }

    async deletePost(postId: number): Promise<void> {
        await this.postsRepository.delete({ id: postId });
    }

    async getPostById(postId: number): Promise<Posts> {
        return await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['user', 'board'],
        });
    }

    async getPostContentById(postId: number): Promise<PostContentDto> {
        const post: Posts = await this.getPostById(postId);
        if (!post) throw new Error('존재하지 않는 게시글입니다.');
        return {
            id: post.id,
            author: post.user.name,
            title: post.title,
            content: post.content,
            postDate: post.postDate,
        } as PostContentDto;
    }

    async updatePost(
        postId: number,
        postInfoDto: PostInfoDto,
        userId: number,
    ): Promise<void> {
        const { author, boardName, content, title } = postInfoDto;
        const user: User = await this.userService.findUserById(userId);
        const board: Board = await this.boardService.getBoardByName(boardName);
        if (!user || !board)
            throw new Error('존재하지 않는 사용자 또는 게시판');
        await this.postsRepository.update(
            { id: postId },
            {
                title: title,
                content: content,
                user: user,
                board: board,
            },
        );
    }

    async getCommentsByPostId(postId: number): Promise<CommentContentDto[]> {
        const post: Posts = await this.postsRepository.findOne({
            where: { id: postId },
            relations: ['comments', 'comments.user'],
        });
        if (!post) throw new Error('존재하지 않는 게시글입니다.');
        return post.comments.map((comment) => ({
            author: comment.user.name,
            content: comment.commentText,
            commentDate: comment.commentDate,
        }));
    }
}
