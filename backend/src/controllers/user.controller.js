//request handling is done here, data is extracted from request, it is validated and then work is done and response is sent back
import { createUser, findUserByEmail } from "../models/user.model.js";
import bcrypt from "bcrypt"
const registerUser = async (req, res) => { //req is express object having several key value pairs like body, params, query etc. the body contains the request
  
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

const loginUser = async(req, res)=>{
  try{
  const{ email, password} = req.body

  if (!email || !password) {
  return res.status(400).json({
    msg: "All fields are required"
  });
}

  const user = await findUserByEmail(email.toLowerCase())

  if(!user){
    //user doesnt exist and has to register
    return res.status(400).json({
      msg: "User Doesnt Exist. You have to register"
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch){
    return res.status(400).json({
      msg: "Invalid Credentials"
    })
  }

  return res.status(200).json({
    msg: "User logged in", 
    user:{
      id : user.id,
      username: user.username, 
      email: user.email
    }
  })

  } catch(error){
    console.error(error.message);
    return res.status(500).json({
      msg: "Internal Server Error"
    })
  }
  
}


export {
  registerUser,
  loginUser
}