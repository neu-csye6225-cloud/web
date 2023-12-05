import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()
const sequelize = new Sequelize({
  dialect:process.env.DB_DIALECT,
  host:process.env.MYSQL_HOST,
  username:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE,
});
export default sequelize;