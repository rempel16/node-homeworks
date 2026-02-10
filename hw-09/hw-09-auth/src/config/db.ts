import { Sequelize } from "sequelize";
import configFile from "../../config/config.json" assert { type: "json" };

const config = (configFile as any).development;

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    logging: false,
  }
);
