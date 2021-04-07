const Teacher = require("../models/Teachers");
const asyncHandler = require("../middlewares/asyncHandler");
const sendResponse = require("../utils/sendResponse");
const Assignments = require("../models/Assignments");
const Student = require("../models/Students");
const Notices = require("../models/Notices");

//Upload assignment
module.exports.uploadAssignment = asyncHandler(async (req, res) => {
    const { title, description, assignmentGiven, deadline } = req.body;

    const teacher = await Teacher.findById(req.teacher._id);

    //Creating new assignment

    const newAssignment = new Assignments({
        givenBy: req.teacher._id,
        title,
        description,
        assignmentGiven,
        deadline,
        uploadDate: Date.now(),
    });

    const saveAssignment = await newAssignment.save();

    console.log(saveAssignment, "uploaded Assignment");

    const updatedTeacher = await Teacher.findByIdAndUpdate(
        {
            _id: teacher._id,
        },
        {
            $push: {
                assignments: saveAssignment._id,
            },
        },
        {
            runValidators: true,
            new: true,
        }
    ).populate("assignments");

    console.log(updatedTeacher, "savedTeacher");

    //Saving assignments in each students document
    const students = await Student.find({});

    for (let i = 0; i < students.length; i++) {
        students[i].assignments.push(saveAssignment._id);

        const savedStudent = await students[i].save();

        console.log(savedStudent, "savedStudent");
    }

    sendResponse(updatedTeacher, "assignment uploaded", res);
});

//Get all assignments of teachers and assignments submitted by students
module.exports.getTeacher = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById({
        _id: req.teacher._id,
    })
        .populate({
            path: "assignments",
            populate: {
                path: "assignmentsSubmitted.givenBy",
            },
        })
        .populate("notices");

    console.log(teacher, "teacher");

    sendResponse(teacher, "teacher data fetched successfully", res);
});

module.exports.addNotice = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    //Creating a new notice
    const newNotice = new Notices({
        title,
        description,
        uploadDate: Date.now(),
        givenBy: req.teacher._id,
    });

    const savedNotice = await newNotice.save();

    //Saving notice in teacher's collection
    const updatedTeacher = await Teacher.findByIdAndUpdate(
        {
            _id: req.teacher._id,
        },
        {
            $push: {
                notices: savedNotice._id,
            },
        },
        {
            runValidators: true,
            new: true,
        }
    ).populate("notices");

    console.log(updatedTeacher, "updated teacher");

    //Saving notices in each students document
    const students = await Student.find({});

    for (let i = 0; i < students.length; i++) {
        students[i].notices.push(savedNotice._id);

        const savedStudent = await students[i].save();

        console.log(savedStudent, "savedStudent");
    }

    sendResponse(updatedTeacher, "notice added successfully", res);
});
