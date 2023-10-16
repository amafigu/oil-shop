import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import awsRoutes from './routes/aws.js';
import productCategoryRoutes from './routes/productCategory.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/aws', awsRoutes);

export default app;
