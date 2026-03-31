
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

    //server needs DB to function, without it, no request can be handled.
    //So if DB fails to connect, i want to stop the server completely. Error is thrown in those cases, where i dont want to stop the server, rather i want someone to handle it and keep the server running. But in this case, no point in keeping the server running. so kill the process.
    process.exit(1); 
  }
};

export default connectDB;
//here default is used because this file only has one main important thing which is this connectDB function. Also when we import this somewhere else we can do [import anyName from "../config/database.js"]