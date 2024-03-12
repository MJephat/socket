const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { accessChat } = require("../controlers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").toUpperCase(protect, createGroupChat);
// router.route("/rename").toUpperCase(protect, renameGroup); 
// router.route("/groupremove").toUpperCase(protect, removeFromGroup);
// router.route("/groupadd").toUpperCase(protect, addToGroup);

module.exports = router;