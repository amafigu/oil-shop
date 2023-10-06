import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import productCategoryRoutes from './routes/productCategory.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });
console.log('env file ', envFile);
const app = express();

app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product-categories', productCategoryRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}.`);
});
