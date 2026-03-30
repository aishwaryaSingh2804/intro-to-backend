HOW TO NAVIGATE BACKEND

1. npm init -y -> i am creating a new js project so initialise it, -y will say yes to all info like author, licesnse etc -> package.json is formed

2. npm install -> when i run this, whatever dependencies are written in package.json they will be installed, initially there wont be any so i have to run npm install mysql2 dotenv express, as i require these libraries.
in package.json we do -> "type":"module"

3. now i create the structure
 backend/
       src -> i. index.js(starts the server/ imports database to ensure 
                           database is connected before running server logic) 
               ii. app.js(sets up express app and middleware)
       config -> database.js (connects server with database using mysql2 to interact with db)

index.js runs
   ↓
calls connectDB()
   ↓
connectDB starts execution
   ↓
await mysql.createConnection(...)
   ↓
(wait until DB connects)
   ↓
returns connection
   ↓
Promise resolves
   ↓
index.js continues