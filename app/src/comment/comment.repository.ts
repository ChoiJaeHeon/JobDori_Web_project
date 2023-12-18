import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository extends Repository<Comment> {}
