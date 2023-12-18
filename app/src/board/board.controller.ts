import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { BoardService } from './board.service';
import PostContentDto from 'src/posts/dto/postContent.dto';
import BoardInfoDto from './dto/boardInfo.dto';
import { BoardContentDto } from './dto/boardContent.dto';

@Controller('board')
export class BoardController {
    private readonly logger = new Logger(BoardController.name);
    constructor(private readonly boardService: BoardService) {}

    // TODO : 게시판 만들기
    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async createBoard(
        @Req() req,
        @Body() boardInfoDto: BoardInfoDto,
        @Res() res,
    ) {
        this.logger.log('createBoard called');
        console.log(boardInfoDto);
        try {
            const userId = req.user.sub;
            const board = await this.boardService.createBoard(
                userId,
                boardInfoDto,
            );
            res.status(200).send({ id: board.id });
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시판 생성 실패' });
        }
    }

    @Post('/modify/:boardId')
    @UseGuards(JwtAuthGuard)
    async modifyBoard(
        @Req() req,
        @Param('boardId') boardId: number,
        @Body() boardInfoDto: BoardInfoDto,
        @Res() res,
    ) {
        try {
            const userId = req.user.sub;
            await this.boardService.modifyBoard(userId, boardInfoDto, boardId);
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시판 수정 실패' });
        }
    }

    // TODO : 게시판 삭제
    @Delete('/:boardId')
    @UseGuards(JwtAuthGuard)
    async deleteBoard(
        @Req() req,
        @Param('boardId') boardId: number,
        @Res() res,
    ) {
        if (boardId <= 5) {
            res.status(400).json({
                message: '기본 게시판은 삭제할 수 없습니다.',
            });
        }
        try {
            const userId = req.user.sub;
            await this.boardService.deleteBoard(userId, boardId);
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시판 삭제 실패' });
        }
    }

    // TODO : 특정 게시판의 모든 글 가져오기 -> Pagination 필요
    @Get('posts/:boardId')
    async getBoard(@Param('boardId') boardId: number, @Res() res) {
        try {
            const posts: PostContentDto[] =
                await this.boardService.getPostsFromBoard(boardId);
            res.status(200).json({ posts });
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시판 조회 실패' });
        }
    }

    // TODO : 특정 게시판의 top5 글 가져오기 (최신 또는 인기) -> 일단은 최신 5개
    @Get('posts/:boardId/top5')
    async getTop5Board(@Param('boardId') boardId, @Res() res) {
        try {
            const posts: PostContentDto[] =
                await this.boardService.getTop5Board(boardId);
            res.status(200).json({ posts });
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시판 조회 실패' });
        }
    }

    // TODO : 기본 게시판 외 목록 가져오기
    @Get('/list')
    async getBoardList(@Res() res) {
        try {
            const boards: BoardContentDto[] =
                await this.boardService.getBoardList();
            res.status(200).json({ boards });
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시판 목록 조회 실패' });
        }
    }
}
