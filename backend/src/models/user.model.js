import connectDB from "../../config/database.js";

export const createUser = async (userData) => {
  try {
    const connection = await connectDB();

    const { username, email, password } = userData;

    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

    const [result] = await connection.execute(query, [
      username,
      email,
      password
    ]);

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