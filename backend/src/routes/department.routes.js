const express = require("express")
const router = express.Router()

const {authorize} = require('../middleware/role.middleware')
const {
  getDepartments,createDepartment
} = require("../controllers/department.controller")

router.get("/", getDepartments)
router.post("/",authorize("admin"),createDepartment)

module.exports = router