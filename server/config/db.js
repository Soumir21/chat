const mongoose= require("mongoose")

const dbConnect=async(url)=>{
    try{
        await mongoose.connect(url)
        console.log("connection successfull")

    }
    catch(err){
        console.log(err)
    }
}

module.exports= dbConnect