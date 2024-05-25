const express=require("express")
// const chats=require("./Data/Data")
const app=express()
const cors=require("cors")
const dbConnect=require("./config/db")
const userRouter=require("./Routes/userRoute")
const chatRouter=require("./Routes/chatRouter")
const messageRouter=require("./Routes/messageRoute")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
require('dotenv').config();
app.use(cors())
dbConnect(process.env.MONGO_SERVER);
const path=require("path");

app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRouter)
//-----------deployment--------------//
const buildPath = 'D:/code/project/Chat/client/build';

if(process.env.NODE_ENV==="production"){
   app.use(express.static(buildPath))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(buildPath,"index.html"))
    })
}
else{
    app.get("/",(req,res)=>{
        res.send("API runng succcssfully")
    })
}

//-----------deployment--------------//
app.use(notFound);
app.use(errorHandler)
const server=app.listen(process.env.PORT,console.log("serrver started"));

const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on("connection",(socket)=>{
    console.log("connetct to socket.io")

    socket.on("setup",(userData)=>{
        socket.join(userData._id)
        console.log(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
        socket.join(room)
        console.log("user joined "+room)
    });
    socket.on("typing",(room)=>socket.to(room).emit("typing"))
    socket.on("stop typing",(room)=>socket.to(room).emit("stop typing"))
    socket.on("new message",(newMessageReceived)=>{
        var chat = newMessageReceived.chat;
       
        if(!chat.users) return console.log('chat.users not defined');
        chat.users.forEach(user=>{
            console.log(user)
            if(user._id===newMessageReceived.sender._id) return;
            io.to(user._id).emit("message recieved",newMessageReceived)
        })
    })

    socket.off("setup",()=>{
        console.log("USER DC");;
        socket.leave(userData._id)
    })
})