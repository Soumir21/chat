const asyncHandler=require("express-async-handler")
const User=require("../models/user")
const generateToken=require("../config/generateToken")
const registerUser=asyncHandler(async(req,res)=>{

    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
          res.status(400)
        throw new Error("please enter all the detais")
    }

    const userExist=await User.findOne({email:email});
    if(userExist){
         res.status(400)
        throw new Error("Email already exists")
    }

    const user=await User.create(req.body);
    if(user){
         res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token: await generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("user could not be created")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all the details");
    }

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
        res.status(400);
        throw new Error("Email does not exist");
    }

    if(userExist.matchPassword(password)){
        res.status(200).json({
            _id:userExist._id,
            name:userExist.name,
            email:userExist.email,
            token: await generateToken(userExist._id)
        })

        
    }
});

module.exports={registerUser,loginUser}