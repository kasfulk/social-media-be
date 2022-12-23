/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('/images')
export class ImagesController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename(req, file, callback) {
          callback(null, Date.now() + '_' + file.originalname);
        },
        destination: '@/../uploads',
      }),
    }),
  )
  uploadFiles(@Req() req) {
    return {
      filename: req.file.filename,
    };
  }
}
