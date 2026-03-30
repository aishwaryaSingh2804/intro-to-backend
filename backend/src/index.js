// starts the server
import app from "./app.js";
import connectDB from "../config/database.js"; //.js as we are using module

const startServer = async()=>{
    try {
        await connectDB()
        app.on("error", (error)=>{
            console.log("ERROR", error);
            throw error
        })
        app.listen(process.env.PORT || 4000, ()=>{
            console.log(`server is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log('MySQL error', error);
        
    }
    
}

startServer()

// if databse fails to connect, we would want to know before server starts handling users
//goes one folder up and executes code inside database.js executes immediately