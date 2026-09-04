import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import CommentSchema from '../../schemas/Comment.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyModule } from '../property/property.module';
import { BoardArticle } from '../../libs/dto/board-article/board-article';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Comment',
				schema: CommentSchema,
			},
		]),
		AuthModule,
		MemberModule,
		PropertyModule,
		BoardArticle,
	],
	providers: [CommentResolver, CommentService],
})
export class CommentModule {}
