import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import cartItemsModel from './cartItems.js';
import productModel from './product.js';
import productCategoryModel from './productCategory.js';
import userModel from './user.js';
import userOrdersModel from './userOrders.js';
import userShippingDataModel from './userShippingData.js';
import userRolesModel from './usersRole.js';

dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = userModel(sequelize, Sequelize);

db.products = productModel(sequelize, Sequelize);
db.productCategories = productCategoryModel(sequelize, Sequelize);
db.usersShippingData = userShippingDataModel(sequelize, Sequelize);
db.userRoles = userRolesModel(sequelize, Sequelize);
db.userOrders = userOrdersModel(sequelize, Sequelize);
db.cartItems = cartItemsModel(sequelize, Sequelize);

db.products.belongsTo(db.productCategories, {
  foreignKey: 'productCategoryId',
  as: 'category',
});
db.productCategories.hasMany(db.products, { foreignKey: 'productCategoryId' });

db.users.hasOne(db.usersShippingData, {
  foreignKey: 'userId',
  as: 'shippingData',
  onDelete: 'CASCADE',
});

db.users.hasMany(db.userOrders, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

db.userOrders.belongsTo(db.users, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

db.usersShippingData.belongsTo(db.users, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

db.users.belongsTo(db.userRoles, {
  foreignKey: 'roleId',
  as: 'role',
});

db.userRoles.hasMany(db.users, {
  foreignKey: 'roleId',
});

db.products.hasMany(db.cartItems, {
  foreignKey: 'productId',
});

db.cartItems.belongsTo(db.products, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

db.userOrders.hasMany(db.cartItems, {
  foreignKey: 'userOrderId',
  onDelete: 'CASCADE',
});

export default db;
