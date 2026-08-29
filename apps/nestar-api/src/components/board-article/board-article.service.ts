import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { Model } from 'mongoose';

@Injectable()
export class BoardArticleService {
	constructor(
		@InjectModel('BoardAticle')
		private readonly boardArticleModel: Model<BoardArticle>,
	) {}
}
