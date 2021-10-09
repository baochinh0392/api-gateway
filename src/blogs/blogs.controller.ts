import {
  Controller,
  Body, Param, Get, Post, Delete, Put,
  UploadedFile, UseInterceptors
} from '@nestjs/common';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { BlogService } from './blog.service';
import { S3Service } from '../s3.service';
import { CreateBlogDto } from './createBlog.dto';
import { UpdateBlogDto } from './updateBlog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogService,
    private s3Service: S3Service
  ) {}

  @Get("/ping-blog")
  pingServiceBlog() {
    return this.blogService.pingServiceBlog();
  }

  @Get()
  async getBlogs() {
    return this.blogService.getBlogs();
  }

  @Get(':id')
  async showBlog(@Param('id') id: string) {
    return this.blogService.showBlog(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'content', 'file']
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async createBlog(@Body() createBlogDto: CreateBlogDto, @UploadedFile() file: Express.Multer.File) {
    const image = await this.s3Service.uploadFile(file)
    
    return this.blogService.createBlog(createBlogDto, image);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['id', 'title', 'content', 'file']
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @UploadedFile() file: Express.Multer.File) {
    const image = await this.s3Service.uploadFile(file)

    return this.blogService.updateBlog(id, updateBlogDto, image);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
