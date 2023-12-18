import {
    Body,
    Controller,
    Delete,
    Logger,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { CommentService } from './comment.service';
import CommentInfoDto from './dto/commentInfo.dto';

@Controller('comment')
export class CommentController {
    private readonly logger = new Logger(CommentController.name);
    constructor(private readonly commentService: CommentService) {}

    // TODO : 특정 게시글에 댓글 작성
    @Post(':postId')
    @UseGuards(JwtAuthGuard)
    async writeComment(
        @Req() req,
        @Body() commentInfoDto: CommentInfoDto,
        @Param('postId') postId: number,
        @Res() res,
    ): Promise<void> {
        try {
            const userId = req.user.sub;
            console.log(commentInfoDto);
            await this.commentService.createComment(
                userId,
                commentInfoDto,
                postId,
            );
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '댓글 작성 실패' });
        }
    }

    // TODO : 특정 댓글 수정
    @Post('modify/:commentId')
    @UseGuards(JwtAuthGuard)
    async updateComment(
        @Req() req,
        @Body() commentInfoDto: CommentInfoDto,
        @Param('commentId') commentId: number,
        @Res() res,
    ): Promise<void> {
        try {
            const userId = req.user.sub;
            await this.commentService.updateComment(
                userId,
                commentInfoDto,
                commentId,
            );
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '댓글 수정 실패' });
        }
    }

    // TODO : 특정 댓글 삭제
    @Delete(':commentId')
    @UseGuards(JwtAuthGuard)
    async deleteComment(
        @Req() req,
        @Param('commentId') commentId: number,
        @Res() res,
    ): Promise<void> {
        try {
            const userId = req.user.sub;
            await this.commentService.deleteComment(userId, commentId);
            res.status(200).send();
        } catch (e) {
            this.logger.error(e);
            res.status(500).json({ message: '댓글 삭제 실패' });
        }
    }
}
