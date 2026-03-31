//sets up express app and middleware

import express from "express"; //since we are using type module, we will use import not require to 
// import express library
import userRouter from './routes/user.routes.js'

const app = express(); //create an express app

//Adds middleware to parse JSON
//middleware = A function that runs before request reaches route
app.use(express.json()) // parse the json file in incoming request

//import routes
app.use("/api/v1/users", userRouter)

// example rout -> http://localhost:3000/api/v1/users/register

export default app; //so that other files can use it