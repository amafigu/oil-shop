import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const router = express.Router();

router.get('/generate-upload-url', async (req, res) => {
  const fileName = `${Date.now()}-${req.query.fileName}`;

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-2',
  });

  const s3 = new AWS.S3();
  const urlExpirationInSeconds = 3600;
  const params = {
    Bucket: 'oylo-images',
    Key: fileName,
    Expires: urlExpirationInSeconds,
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({ uploadURL, fileName });
  } catch (error) {
    res.status(500).json({ message: 'Error generating upload URL' });
  }
});

export default router;
