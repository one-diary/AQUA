const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

const {
    submitAssignment,
    getNotices,
    getStudent,
} = require("../controllers/assignStudent");

router.post("/submitAssignment", requireLogin, submitAssignment);
router.get("/getNotices", requireLogin, getNotices);
router.get("/getStudent", requireLogin, getStudent);

module.exports = router;
