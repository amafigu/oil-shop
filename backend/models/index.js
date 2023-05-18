require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    protocol: config.protocol,
    dialectOptions: config.dialectOptions,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require('./product')(sequelize, Sequelize);
module.exports = db;
