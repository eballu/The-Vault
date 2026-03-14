const express = require("express")
const router = express.Router()

const upload = require("../middleware/upload.middleware")
const { authenticate } = require("../middleware/auth.middleware")
const authorize = require("../middleware/role.middleware")

const {
  uploadCourseFile,
  getCourseFiles,
  downloadFile,
  deleteFile
} = require("../controllers/file.controller")

/*
UPLOAD FILE
*/
router.post("/courses/:id/files",authenticate,
    upload.single("file"),uploadCourseFile
)

/*
 
*/
router.get(
  "/courses/:id/files",
  getCourseFiles
)

/*
DOWNLOAD FILE
*/
router.post(
  "/files/:id/download",
  authenticate,
  downloadFile
)

/*
DELETE FILE (ADMIN)
*/
router.delete(
  "/files/:id",
  authenticate,
  authorize("admin"),
  deleteFile
)

module.exports = router