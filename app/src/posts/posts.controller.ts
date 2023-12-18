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
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import CommentContentDto from 'src/comment/dto/commentContent.dto';
import PostContentDto from './dto/postContent.dto';
import PostInfoDto from './dto/postInfo.dto';
import { Posts } from './posts.entity';

@Controller('posts')
export class PostsController {
    private readonly logger = new Logger(PostsController.name);
    constructor(private readonly postsService: PostsService) {}

    // TODO : 특정 게시판에 글 작성
    @Post('/write')
    @UseGuards(JwtAuthGuard)
    async writePost(
        @Req() req: any,
        @Body() postInfoDto: PostInfoDto,
        @Res() res: any,
    ): Promise<void> {
        try {
            const userId = req.user.sub;
            const post: Posts = await this.postsService.createPost(
                userId,
                postInfoDto,
            );
            res.status(200).send(post);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시글 생성 실패' });
        }
    }

    // TODO : 특정 게시글 삭제
    @Delete('/:postId')
    @UseGuards(JwtAuthGuard)
    async deletePost(
        @Param('postId') postId: number,
        @Res() res: any,
    ): Promise<void> {
        try {
            await this.postsService.deletePost(postId);
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시글 삭제 실패' });
        }
    }

    // TODO : 특정 게시글 조회 (내용 + 메타데이터)
    @Get('/:postId')
    async getPost(
        @Param('postId') postId: number,
        @Res() res: any,
    ): Promise<void> {
        try {
            const postContent: PostContentDto =
                await this.postsService.getPostContentById(postId);
            res.status(200).json(postContent);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시글 조회 실패' });
        }
    }

    // TODO : 특정 게시글 수정
    @Post('/:postId')
    @UseGuards(JwtAuthGuard)
    async updatePost(
        @Req() req: any,
        @Param('postId') postId: number,
        @Body() postInfoDto: PostInfoDto,
        @Res() res: any,
    ): Promise<void> {
        try {
            const userId = req.user.sub;
            await this.postsService.updatePost(postId, postInfoDto, userId);
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '게시글 수정 실패' });
        }
    }

    // TODO : 특정 게시글의 모든 댓글 조회
    @Get('/:postId/comment')
    async getComments(@Param('postId') postId: number, @Res() res: any) {
        try {
            const comments: CommentContentDto[] =
                await this.postsService.getCommentsByPostId(postId);
            res.status(200).json(comments);
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '댓글 조회 실패' });
        }
    }
}
