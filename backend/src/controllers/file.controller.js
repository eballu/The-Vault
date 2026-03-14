const prisma = require("../utils/prisma")

const uploadCourseFile = async (req, res) => {
  try {
    if (!req.file) {
  return res.status(400).json({ message: "No file uploaded" })
}
    const { id } = req.params

    const course = await prisma.course.findUnique({
      where: { id }
    })

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    

    const file = await prisma.courseFile.create({
      data: {
        course: {
          connect: { id }
        },
        file_name: req.file.originalname,
        file_type: req.file.mimetype,
        file_url: req.file.path,
        file_size: req.file.size
      }
    })

    res.status(201).json({
      message: "File uploaded successfully",
      file
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCourseFiles = async (req, res) => {
  try {

    const { id } = req.params

    const files = await prisma.courseFile.findMany({
      where: {
        course_id: id
      },
      orderBy: {
        created_at: "desc"
      }
    })

    res.json(files)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const downloadFile = async (req, res) => {
  try {

    const { id } = req.params

    const file = await prisma.courseFile.findUnique({
      where: { id }
    })

    if (!file) {
      return res.status(404).json({ message: "File not found" })
    }

    // record download
    await prisma.download.create({
      data: {
        course: {
          connect: { id: file.course_id }
        },
        user: {
          connect: { id: req.user.id }
        }
      }
    })

    res.json({
      download_url: file.file_url
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteFile = async (req, res) => {
  try {

    const { id } = req.params

    const file = await prisma.courseFile.findUnique({
      where: { id }
    })

    if (!file) {
      return res.status(404).json({ message: "File not found" })
    }

    await prisma.courseFile.delete({
      where: { id }
    })

    res.json({
      message: "File deleted successfully"
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = {
  uploadCourseFile,
  getCourseFiles,
  downloadFile,
  deleteFile
}