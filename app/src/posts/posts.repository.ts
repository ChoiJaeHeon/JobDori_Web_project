import { Repository } from 'typeorm';
import { Posts } from './posts.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsRepository extends Repository<Posts> {}
