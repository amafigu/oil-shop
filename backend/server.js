// const express = require('express');
import express from 'express';
import cors from 'cors';
// const cors = require('cors');
const app = express();
// const productRoutes = require('./routes/products');
import productRoutes from './routes/products.js'

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}.`);
});
