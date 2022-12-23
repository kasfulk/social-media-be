import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [PostsController],
  providers: [PostsService, JwtStrategy],
})
export class PostsModule {}
