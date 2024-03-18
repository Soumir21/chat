const express=require("express")
const chats=require("./Data/Data")
const app=express()
const cors=require("cors")
require('dotenv').config();
app.use(cors());

app.get("/",(req,res)=>res.send("Api start"))

app.get("/api/chat",(req,res)=>res.send({chats}))
app.get("/api/chat/:id",(req,res)=>{
    const id=req.params.id;
    const chat=chats.find((singleChat)=>singleChat._id===id);
    res.send(chat);
})
app.listen(process.env.PORT,console.log("serrver started"));