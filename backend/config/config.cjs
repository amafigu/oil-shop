const dotenv = require('dotenv');
dotenv.config();

const sequelizeConfig = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  protocol: 'postgres',
};

module.exports = {
  development: sequelizeConfig,
  production: sequelizeConfig,
  test: sequelizeConfig,
};
