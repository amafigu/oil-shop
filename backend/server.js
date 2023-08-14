import cors from 'cors';
import express from 'express';
import productRoutes from './routes/products.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}.`);
});
