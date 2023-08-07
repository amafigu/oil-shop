import dotenv from 'dotenv'
import Sequelize from 'sequelize';
import productModel from './product.js';
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});

const db = {};

db.Sequelize = Sequelize; 
db.sequelize = sequelize; 

db.product = productModel(sequelize, Sequelize);

export default db;