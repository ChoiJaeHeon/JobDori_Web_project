import {
    Controller,
    Get,
    Logger,
    Param,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import UserInfoDto from './dto/userInfo.dto';
import PostInfoDto from 'src/posts/dto/postInfo.dto';
import CommentInfoDto from 'src/comment/dto/commentInfo.dto';
import { BoardContentDto } from 'src/board/dto/boardContent.dto';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    // TODO : 우상단 출력용 유저 정보 조회 -> UserInfoDto
    @Get('/my/info')
    @UseGuards(JwtAuthGuard)
    async getMyInfo(@Req() req: any, @Res() res: any): Promise<void> {
        try {
            const user: UserInfoDto = await this.userService.getUserInfoById(
                req.user.sub,
            );
            res.status(200).json(user);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // TODO : 자신의 모든 게시글 조회
    @Get('/my/posts')
    @UseGuards(JwtAuthGuard)
    async getMyPosts(@Req() req: any, @Res() res: any): Promise<void> {
        try {
            const posts: PostInfoDto[] = await this.userService.getMyPosts(
                req.user.sub,
            );
            res.status(200).json(posts);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // TODO : 자신의 모든 댓글 조회
    @Get('/my/comments')
    @UseGuards(JwtAuthGuard)
    async getMyComments(@Req() req: any, @Res() res: any): Promise<void> {
        try {
            const comments: CommentInfoDto[] =
                await this.userService.getMyComments(req.user.sub);
            res.status(200).json(comments);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // TODO : 자신이 만든 게시판 조회
    @Get('/my/boards')
    @UseGuards(JwtAuthGuard)
    async getMyBoards(@Req() req: any, @Res() res: any): Promise<void> {
        try {
            const userId = req.user.sub;
            const boards: BoardContentDto[] =
                await this.userService.getMyStudyGroups(userId);
            res.status(200).json(boards);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // TODO : 특정 유저 정보 조회 -> UserInfoDto
    @Get('/:username/info')
    @UseGuards(JwtAuthGuard)
    async getUserInfo(@Param('username') username: string) {
        try {
            const user: UserInfoDto =
                await this.userService.getUserInfoByUsername(username);
            return user;
        } catch (e) {
            this.logger.error(e);
        }
    }

    // TODO : 특정 유저의 모든 게시글 조회
    @Get('/:username/posts')
    @UseGuards(JwtAuthGuard)
    async getUserPosts(@Param('username') username: string) {
        try {
            const posts: PostInfoDto[] =
                await this.userService.getUserPosts(username);
            return posts;
        } catch (e) {
            this.logger.error(e);
        }
    }

    // TODO : 특정 유저의 모든 댓글 조회
    @Get('/:username/comments')
    @UseGuards(JwtAuthGuard)
    async getUserComments(@Param('username') username: string) {
        try {
            const comments: CommentInfoDto[] =
                await this.userService.getUserComments(username);
            return comments;
        } catch (e) {
            this.logger.error(e);
        }
    }

    // TODO : Like Entity 만든 후
    // TODO : 자신이 좋아요한 게시글 조회
}
