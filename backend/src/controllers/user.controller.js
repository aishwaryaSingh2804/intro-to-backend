//request handling is done here, data is extracted from request, it is validated and then work is done and response is sent back
import { createUser, findUserByEmail } from "../models/user.model.js";

export const registerUser = async (req, res) => { //req is express object having several key value pairs like body, params, query etc. the body contains the request
  
  try {
    // 1. Get data from request body
    const { username, email, password } = req.body;

    // 2. Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 3. Check if user already exists
    const existingUser = await findUserByEmail(email.toLowerCase());

    if (existingUser) {
      return res.status(400).json({ // 400 = bad client request
        message: "User already exists"
      });
    }

    // 4. Create new user
    const result = await createUser({
      username,
      email: email.toLowerCase(),
      password
    });

    // 5. Send success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        username,
        email: email.toLowerCase()
      }
    });

  } catch (error) {
    console.error("Error in registerUser:", error.message);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};