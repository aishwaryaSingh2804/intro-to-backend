// starts the server
import app from "./app.js";
import connectDB from "../config/database.js"; //.js as we are using module

const startServer = async()=>{
    try {
        await connectDB() //connect to DB

        //app ie an instance of express library is an event emitter ie if an event like an error occurs, it will emit a string "error"
        //i want to use event listener on for event of an error
        //if an error occurs even before the server has started, we want to kill the process an handle it
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