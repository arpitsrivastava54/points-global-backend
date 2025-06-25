import AWS from 'aws-sdk';
import { config } from '../configs/config';

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

export const uploadToS3 = async (file: any, key: string) => {
  const params = {
    Bucket: config.aws.bucket!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const { Location } = await s3.upload(params).promise();
  return Location;
};

export const downloadFromS3 = async (key: string) => {
  const params = {
    Bucket: config.aws.bucket!,
    Key: key,
  };
  const { Body } = await s3.getObject(params).promise();
  return Body;
};