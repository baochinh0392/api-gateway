import { Injectable, Inject } from "@nestjs/common";
import {
  ClientProxy
} from '@nestjs/microservices';
import { CreateBlogDto } from './createBlog.dto';
import { UpdateBlogDto } from './updateBlog.dto';
import { map } from "rxjs/operators";

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_SERVICE') private readonly clientServiceBlog: ClientProxy
  ) {}

  pingServiceBlog() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.clientServiceBlog
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  getBlogs = () => {
    return this.clientServiceBlog.send({ cmd: 'getBlogs' }, {});
  };

  showBlog = (id: string) => {
    return this.clientServiceBlog.send({ cmd: 'showBlog' }, id);
  };

  createBlog = (createBlogDto: CreateBlogDto, image: string) => {
    createBlogDto.image = image
    return this.clientServiceBlog.send({ cmd: 'createBlog' }, createBlogDto);
  };

  updateBlog = (id: string, updateBlogDto: UpdateBlogDto, image: string) => {
    updateBlogDto.image = image
    return this.clientServiceBlog.send({ cmd: 'updateBlog' }, {id: id, updateBlogDto: updateBlogDto});
  };

  deleteBlog = (id: string) => {
    return this.clientServiceBlog.send({ cmd: 'deleteBlog' }, id);
  };
}
