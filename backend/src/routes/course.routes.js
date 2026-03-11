const express = require("express")
const router = express.Router()



const {
  createCourse,
  getCourses,
  getCourseById,
  getPendingCourses,
  approveCourse,
  rejectCourse
} = require("../controllers/course.controller")

const { authenticate } = require("../middleware/auth.middleware")
const authorize = require("../middleware/role.middleware");

router.post("/", authenticate,authorize("admin","staff"), createCourse)
router.get("/", getCourses)
router.get("/:id", getCourseById)
// admin sees pending courses
router.get(
  "/pending",
  authenticate,
  authorize("admin"),
  getPendingCourses
)


// approve
router.patch(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  approveCourse
)


// reject
router.patch(
  "/:id/reject",
  authenticate,
  authorize("admin"),
  rejectCourse
)


module.exports = router