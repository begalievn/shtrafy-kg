import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { LikeService } from './like.service';

@ApiTags('Лайки')
@Controller('like')
export class LikeController {
  constructor(private readonly likeServise: LikeService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Вывести все избранные видео-блоги всех пользователей',
  })
  async getAll(@Query() listParamsDto: ListParamsDto) {
    return this.likeServise.list(listParamsDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Вывести все ваши избранные видео-блоги' })
  async getAllYour(@Req() req) {
    return this.likeServise.getLikes(req.user.email);
  }

  @Post(':blogId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавить видео-блог в избранные' })
  async like(@Param('blogId') blogId: number, @Req() req) {
    return await this.likeServise.like(blogId, req.user.email);
  }

  @Delete(':blogId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить видео-блог из избранных' })
  async dislike(@Param('blogId') blogId: number, @Req() req) {
    return await this.likeServise.dislike(blogId, req.user.email);
  }
}