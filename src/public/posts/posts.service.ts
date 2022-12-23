/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Posts } from '@prisma/client';
import { PostPayload } from './posts.type';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async showPosts(username: string) {
    return this.prisma.posts.findMany({
      where: {
        User: {
          username,
        },
      },
    });
  }

  async showDetail(id: number) {
    return this.prisma.posts.findFirst({
      where: {
        id,
      },
    });
  }

  async insertPost(payload: PostPayload) {
    return this.prisma.posts.create({
      data: payload,
    });
  }

  async updatePost(id: number, payload: PostPayload) {
    return this.prisma.posts.update({
      where: { id },
      data: payload,
    });
  }

  async deletePost(id: number) {
    return this.prisma.posts.delete({
      where: { id },
    });
  }

  async findUsername(username: string) {
    return this.prisma.users.findFirst({
      where: {
        username,
      },
    });
  }
}
