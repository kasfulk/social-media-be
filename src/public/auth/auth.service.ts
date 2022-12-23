/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { Register } from './auth.type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const usersData = await this.prisma.users.findFirst({
      where: {
        username,
      },
    });
    if (!usersData?.id) {
      return {
        matched: false,
        message: 'User not Found',
      };
    }
    const { password, ...userData } = usersData;
    const passwordCompare = await bcrypt.compare(pass, password);
    if (!passwordCompare) {
      return {
        matched: false,
        message: 'Wrong Password',
      };
    }
    return {
      matched: true,
      data: userData,
    };
  }

  async login(payload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(payload: Users) {
    const register: Register = {
      username: payload.username,
      email: payload.email,
      password: await bcrypt.hash(payload.password, 10),
    };
    return this.prisma.users.create({
      data: register,
    });
  }
}
