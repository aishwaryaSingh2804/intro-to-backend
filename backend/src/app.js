//sets up express app and middleware

import express from "express"; //since we are using type module, we will use import not require to 
// import express library

const app = express(); //create an express app

app.use(express.json()) // parse the json file in incoming request

//import routes
import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)
// example rout -> http://localhost:3000/api/v1/users/register

export default app; //so that other files can use it