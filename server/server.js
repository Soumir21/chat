const express=require("express")
const chats=require("./Data/Data")
const app=express()
const cors=require("cors")
const dbConnect=require("./config/db")
const userRouter=require("./Routes/userRoute")
const chatRouter=require("./Routes/chatRouter")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
require('dotenv').config();
app.use(cors())
dbConnect(process.env.MONGO_SERVER);

app.use(express.json())
app.get("/",(req,res)=>res.send("Api start"))
app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)
app.use(notFound);
app.use(errorHandler)
app.listen(process.env.PORT,console.log("serrver started"));