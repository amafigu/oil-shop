import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import productModel from './product.js';
import productCategoryModel from './productCategory.js';
import userModel from './user.js';
import userShippingDataModel from './userShippingData.js';
dotenv.config();
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
db.userShippingData = userShippingDataModel(sequelize, Sequelize);

db.product.belongsTo(db.productCategory, {
  foreignKey: 'productCategoryId',
  as: 'category',
});
db.productCategory.hasMany(db.product, { foreignKey: 'productCategoryId' });

db.user.hasOne(db.userShippingData, {
  foreignKey: 'userId',
  as: 'shippingData',
});
db.userShippingData.belongsTo(db.user, {
  foreignKey: 'userId',
});

export default db;
