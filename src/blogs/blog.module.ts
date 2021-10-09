import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { BlogsController } from './blogs.controller';
import { BlogService } from './blog.service';
import { S3Service } from '../s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "BLOG_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'blogs_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ])
  ],
  controllers: [BlogsController],
  providers: [BlogService, S3Service],
})
export class BlogModule {}
