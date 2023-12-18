import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import PostContentDto from 'src/posts/dto/postContent.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import BoardInfoDto from './dto/boardInfo.dto';
import { BoardContentDto } from './dto/boardContent.dto';

@Injectable()
export class BoardService implements OnModuleInit {
    private readonly logger = new Logger(BoardService.name);
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: BoardRepository,
        private readonly userService: UserService,
    ) {}

    async onModuleInit() {
        await this.seedBoards();
    }

    private async seedBoards(): Promise<void> {
        const predefinedBoards = [
            {
                name: '자유게시판',
                description: '자유롭게 글을 쓸 수 있는 공간',
                isPredefined: true,
            },
            {
                name: '질문게시판',
                description: '익명 질문을 위한 공간',
                isPredefined: true,
            },
            {
                name: '칼럼게시판',
                description: '칼럼을 쓸 수 있는 공간',
                isPredefined: true,
            },
            {
                name: '채용공고',
                description: '채용공고를 올리는 공간',
                isPredefined: true,
            },
            {
                name: '멘토링/스터디',
                description: '멘토링 / 스터디원을 구인하는 공간',
                isPredefined: true,
            },
        ];

        for (const boardData of predefinedBoards) {
            let board = await this.boardRepository.findOne({
                where: { name: boardData.name },
            });
            if (!board) {
                board = this.boardRepository.create(boardData);
                await this.boardRepository.save(board);
            }
        }
    }

    async getBoardById(id: number): Promise<Board> {
        return await this.boardRepository.findOne({ where: { id: id } });
    }

    async getBoardByName(name: string): Promise<Board> {
        return await this.boardRepository.findOne({ where: { name: name } });
    }

    async getPostsFromBoard(boardId: number): Promise<PostContentDto[]> {
        // TODO : Pagination 필요
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
            relations: ['posts', 'posts.user'],
        });
        if (board && board.posts) {
            board.posts.sort(
                (a, b) => b.postDate.getTime() - a.postDate.getTime(),
            );
        }
        const posts: PostContentDto[] = [];
        for (const post of board.posts) {
            posts.push({
                id: post.id,
                author: post.user.name,
                title: post.title,
                content: post.content,
                postDate: post.postDate,
            });
        }
        return posts;
    }

    async getTop5Board(boardId: number): Promise<PostContentDto[]> {
        // TODO : Pagination 필요
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
            relations: ['posts', 'posts.user'],
        });
        if (board && board.posts) {
            board.posts.sort(
                (a, b) => b.postDate.getTime() - a.postDate.getTime(),
            );
        }
        let i = 0;
        const posts: PostContentDto[] = [];
        for (const post of board.posts) {
            if (i === 5) break;
            posts.push({
                id: post.id,
                author: post.user.name,
                title: post.title,
                content: post.content,
                postDate: post.postDate,
            });
            i++;
        }
        return posts;
    }

    async createBoard(
        userId: number,
        boardInfoDto: BoardInfoDto,
    ): Promise<Board> {
        const { name, description, category } = boardInfoDto;
        const user: User = await this.userService.findUserById(userId);
        if (!user) throw new Error('존재하지 않는 사용자입니다.');

        const board = new Board({
            name: name,
            description: description,
            category: category,
            user: user,
            accessible: [userId],
        });
        return await this.boardRepository.save(board);
    }

    async modifyBoard(
        userId: number,
        boardInfoDto: BoardInfoDto,
        boardId: number,
    ): Promise<void> {
        const { name, description } = boardInfoDto;
        const user: User = await this.userService.findUserById(userId);
        if (!user) throw new Error('존재하지 않는 사용자입니다.');
        const board: Board = await this.getBoardById(boardId);
        if (!board) throw new Error('존재하지 않는 게시판입니다.');
        if (board.user.id !== userId) {
            throw new Error('게시판 소유자가 아닙니다.');
        }

        await this.boardRepository.update(
            { id: boardId },
            {
                name: name,
                description: description,
                user: user,
            },
        );
    }

    async deleteBoard(userId: number, boardId: number): Promise<void> {
        const board: Board = await this.getBoardById(boardId);
        if (!board) throw new Error('존재하지 않는 게시판입니다.');
        if (board.user.id !== userId) {
            throw new Error('게시판 소유자가 아닙니다.');
        }
        await this.boardRepository.delete({ id: boardId });
    }

    async getBoardList(): Promise<BoardContentDto[]> {
        const boards = await this.boardRepository.find({
            where: { isPredefined: false },
            relations: ['user'],
            order: { createdDate: 'DESC' },
        });

        const boardList: BoardContentDto[] = [];
        for (const board of boards) {
            boardList.push({
                id: board.id,
                boardName: board.name,
                description: board.description,
                category: board.category,
                author: board.user.name,
                createdAt: board.createdDate,
            });
        }
        return boardList;
    }
}
