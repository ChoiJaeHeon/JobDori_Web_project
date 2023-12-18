import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import UserInfoDto from './dto/userInfo.dto';
import PostInfoDto from 'src/posts/dto/postInfo.dto';
import CommentInfoDto from 'src/comment/dto/commentInfo.dto';
import { Posts } from 'src/posts/posts.entity';
import { Comment } from 'src/comment/comment.entity';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentRepository } from 'src/comment/comment.repository';
import { BoardContentDto } from 'src/board/dto/boardContent.dto';
import { Board } from 'src/board/board.entity';
import { BoardRepository } from 'src/board/board.repository';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        @InjectRepository(Posts)
        private readonly postsRepository: PostsRepository,
        @InjectRepository(Comment)
        private readonly commentRepository: CommentRepository,
        @InjectRepository(Board)
        private readonly boardRepository: BoardRepository,
    ) {}

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id: id } });
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    async findUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { name: username },
        });
    }

    async createUser(user: JSON): Promise<User> {
        const userEntity = new User({
            name: user['name'],
            email: user['email'],
            profileUrl: user['picture'],
        });
        return await this.userRepository.save(userEntity);
    }

    async getUserInfoById(id: number): Promise<UserInfoDto> {
        const user: User = await this.findUserById(id);
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        return {
            name: user.name,
            email: user.email,
            profileUrl: user.profileUrl,
        };
    }

    async getMyPosts(id: number): Promise<PostInfoDto[]> {
        const posts = await this.postsRepository.find({
            where: { user: { id: id } },
            relations: ['user', 'board'],
        });
        if (!posts) throw new Error('Cannot Find Posts : TypeORM Error.');

        return posts.map((post) => ({
            author: post.user.name,
            boardName: post.board.name,
            title: post.title,
            content: post.content,
            postDate: post.postDate,
        }));
    }

    async getMyComments(id: number): Promise<CommentInfoDto[]> {
        const comments = await this.commentRepository.find({
            where: { user: { id: id } },
            relations: ['post', 'user', 'post.board'],
        });
        if (!comments) throw new Error('Cannot Find Comments : TypeORM Error.');

        return comments.map((comment) => ({
            author: comment.user.name,
            boardName: comment.post.board.name,
            postTitle: comment.post.title,
            content: comment.commentText,
            commentDate: comment.commentDate,
        }));
    }

    async getUserInfoByUsername(username: string): Promise<UserInfoDto> {
        const user: User = await this.findUserByUsername(username);
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        return {
            name: user.name,
            email: user.email,
            profileUrl: user.profileUrl,
        };
    }

    async getUserPosts(username: string): Promise<PostInfoDto[]> {
        const user: User = await this.findUserByUsername(username);
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        return await this.getMyPosts(user.id);
    }

    async getUserComments(username: string): Promise<CommentInfoDto[]> {
        const user: User = await this.findUserByUsername(username);
        if (!user) throw new Error('존재하지 않는 유저입니다.');
        return await this.getMyComments(user.id);
    }

    async getMyStudyGroups(id: number): Promise<BoardContentDto[]> {
        const boards = await this.boardRepository.find({
            where: { user: { id: id } },
            relations: ['user'],
        });
        if (!boards) throw new Error('Cannot Find Boards : TypeORM Error.');
        const boardContents: BoardContentDto[] = [];
        for (const board of boards) {
            boardContents.push({
                id: board.id,
                boardName: board.name,
                description: board.description,
                category: board.category,
                author: board.user.name,
                createdAt: board.createdDate,
            });
        }
        return boardContents;
    }
}
