
import mysql from "mysql2/promise"; //helps server to talk to mysql database and returns a promise
import dotenv from "dotenv";

dotenv.config(); //loads info from .env file

//connectDB is function returning a promise
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({ //connection now contains actual connection object
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log("Connected to MySQL!");
    return connection; // connection is a promise

  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;