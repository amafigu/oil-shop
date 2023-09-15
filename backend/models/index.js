import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import productModel from './product.js';
import productCategoryModel from './productCategory.js';
import userModel from './user.js';
dotenv.config();
console.log('dbUrl', process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = productModel(sequelize, Sequelize);
db.productCategory = productCategoryModel(sequelize, Sequelize);
db.user = userModel(sequelize, Sequelize);

db.product.belongsTo(db.productCategory, {
  foreignKey: 'productCategoryId',
  as: 'category',
});
db.productCategory.hasMany(db.product, { foreignKey: 'productCategoryId' });

export default db;
