const express = require("express")
const router = express.Router()

const {
  createCourse,
  getCourses,
  getCourseById
} = require("../controllers/course.controller")

const { authenticate } = require("../middleware/auth.middleware")

router.post("/", authenticate, createCourse)
router.get("/", getCourses)
router.get("/:id", getCourseById)

module.exports = router