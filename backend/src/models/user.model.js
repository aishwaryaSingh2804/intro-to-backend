// in this we translate raw javascript data into sql queries

import connectDB from "../../config/database.js";

//here we dont use export default because this file will have multiple functions and not a single important function, so when we import we have to use the SAME NAME of function as defined here, otherwise error -> [import anyName from "../model/user.model.js"] IS WRONG!!

//import { createUser, findUser } from "../model/user.model.js" IS THE CORRECT WAY
export const createUser = async (userData) => {
  try {
    const connection = await connectDB();

    const { username, email, password } = userData; //Destructuring, same name as keys in js object

    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?) 
    `; //to prevent sql injection

    const [result] = await connection.execute(query, [
      username,
      email,
      password
    ]); //result = response[0]

    return result;

  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw error; // VERY IMPORTANT
  }
};

// FIND USER BY EMAIL
export const findUserByEmail = async (email) => {
  try {
    const connection = await connectDB();

    const query = `SELECT * FROM users WHERE email = ?`;

    const [rows] = await connection.execute(query, [email]);

    return rows[0]; // first match

  } catch (error) {
    throw error;
  }
};