const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",

  port: 5432,

  user: "postgres",

  password: "Medivyaa3@#%",

  database: "Application",

  mах: 20,

  idleTimeoutMillis: 30000,

  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("connected to the database");
});

pool.on("error", (err) => {
  console.error("error connecting to the database", err.stack);
});

module.exports = pool;
