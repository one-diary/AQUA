const express = require("express");
const router = express.Router();
const {
    uploadAssignment,
    addNotice,
    getTeacher,
} = require("../controllers/assignTeacher");
const requireTeacherLogin = require("../middlewares/requireLoginTeacher");

router.post("/uploadAssignment", requireTeacherLogin, uploadAssignment);
router.post("/notices", requireTeacherLogin, addNotice);
router.get("/getTeacher", requireTeacherLogin, getTeacher);

module.exports = router;
