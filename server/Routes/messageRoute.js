const express=require("express");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const { sendMessageController,allMessagesController } = require("../Controller/messageController");

const router=express.Router();

router.route("/").post(jwtMiddleware,sendMessageController)

router.route("/:chatId").get(jwtMiddleware,allMessagesController)

module.exports=router