/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Req,
  UseGuards,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/public/auth/guard/jwt-auth-guard';
import { PostsService } from './posts.service';
import { UserPayload, PostPayload } from './posts.type';
import { Users } from '@prisma/client';

@Controller('/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    const user: UserPayload = req.user;
    const postsResult = await this.postService.showPosts(user.username);
    return {
      data: postsResult,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findDetail(@Param('id') id: string) {
    const postDetail = await this.postService.showDetail(Number(id));
    return {
      data: postDetail,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPosts(@Body() body, @Req() req: Request) {
    try {
      const user: UserPayload = req.user;
      const userData: Users = await this.postService.findUsername(
        user?.username,
      );
      const payload: PostPayload = {
        userId: userData.id,
        image: body.image,
        caption: body.caption,
      };
      const createPost = await this.postService.insertPost(payload);
      return createPost;
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePosts(@Param('id') id: string) {
    try {
      return this.deletePosts(id);
    } catch (error) {
      return error;
    }
  }
}
