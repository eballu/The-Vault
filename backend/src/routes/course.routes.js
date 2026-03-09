const express = require("express")
const router = express.Router()



const {
  createCourse,
  getCourses,
  getCourseById
} = require("../controllers/course.controller")

const { authenticate } = require("../middleware/auth.middleware")
const authorize = require("../middleware/role.middleware");

router.post("/", authenticate,authorize("admin","staff"), createCourse)
router.get("/", getCourses)
router.get("/:id", getCourseById)

module.exports = router