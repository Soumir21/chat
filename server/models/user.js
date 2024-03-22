const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    pic:{
        type: String,
    
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},
{
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    console.log(`${enteredPassword} and ${this.password}`)
    const isVerify = await bcrypt.compare(enteredPassword, this.password);
    console.log(isVerify);
    return(isVerify)
};

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    else{
        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
        next()
    }
})
const User=new mongoose.model("User",userSchema);

module.exports=User