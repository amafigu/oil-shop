import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const router = express.Router();

router.get('/generate-upload-url', async (req, res) => {
  const fileName = `${Date.now()}-${req.query.fileName}`;

  console.log('ACCESS ', process.env.AWS_ACCESS_KEY);
  console.log('AWS_SECRET_KEY ', process.env.AWS_SECRET_KEY);

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-2',
  });

  const s3 = new AWS.S3();

  const params = {
    Bucket: 'oylo-images',
    Key: fileName,
    Expires: 3600, // URL validity in seconds
  };
  console.log('PARAMS AWS ', params);
  try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({ uploadURL, fileName });
    console.log('UPLOAD AWS ', uploadURL);
  } catch (error) {
    res.status(500).json({ message: 'Error generating upload URL' });
  }
});

export default router;
