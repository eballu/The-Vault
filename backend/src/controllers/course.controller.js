const prisma = require("../utils/prisma")


const createCourse = async (req, res) => {
  try {

    const { title, description, category_id } = req.body

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category_id,
        submitted_by: req.user.userId
      }
    })

    res.status(201).json(course)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const getCourses = async (req, res) => {
  try {

    const courses = await prisma.course.findMany({
      where: {
        status: "approved"
      },
      include: {
        category: true,
        submitter: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    res.json(courses)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const getCourseById = async (req, res) => {
  try {

    const { id } = req.params

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        files: true,
        submitter: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    res.json(course)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = {createCourse,getCourses,getCourseById}