import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service
{
    AWS_S3_BUCKET = process.env.S3_BUCKET;
    s3 = new AWS.S3
    ({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    });

    async uploadFile(file)
    {
      const { originalname } = file;

      return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
      
    }

    async s3_upload(file, bucket, name, mimetype)
    {
      const params = 
      {
        Bucket: bucket,
        Key: String(name),
        Body: file,
        ACL: "public-read",
        ContentType: mimetype,
        ContentDisposition:"inline",
        CreateBucketConfiguration: 
        {
          LocationConstraint: process.env.S3_REGION
        }
      };

      console.log(params);

      try
      {
        let s3Response = await this.s3.upload(params).promise();

        console.log(s3Response);
        return s3Response.Location
      }
      catch (e)
      {
        console.log(e);
      }
    }
}