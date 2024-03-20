const express=require("express")
const router=express.Router();
const {registerUser, loginUser}=require("../Controller/userController")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/").post(()=>)

module.exports=router