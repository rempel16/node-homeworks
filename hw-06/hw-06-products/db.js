import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "product_db",
  waitForConnections: true,
  connectionLimit: 10,
});
