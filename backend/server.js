import cors from 'cors';
import express from 'express';
import productCategoryRoutes from './routes/productCategory.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product-categories', productCategoryRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}.`);
});
