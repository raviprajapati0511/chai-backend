// require('dotenv').config({path:'./env'});
// import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import express from "express";
import { app } from "./app.js";
import dotenv from "dotenv";


dotenv.config({
    path:'./.env'
})


// const app = express();
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.log("DB connection failed:", err);
});
















// 1st approach for connecting database
// import express from "express"
// const app=express()
// // ifis
// // semi colon is for cleaning purpose what if some body didnt put semi colon in the previous line 
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error due to no creation of app from express but the database is connected",error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR:", error)
//         throw error
//     }
// })()