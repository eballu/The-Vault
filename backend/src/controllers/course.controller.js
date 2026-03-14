const prisma = require("../utils/prisma")


const createCourse = async (req, res) => {
  try {

    const { title, description, category_id } = req.body

    // check if category exists
    const category = await prisma.category.findUnique({
      where: { id: category_id }
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }
    
    const course = await prisma.course.create({
      data: {
        title,
        description,
        status: "pending",
        category: {
          connect: {
            id: category_id
          }
        },
       submitter: {
      connect: {
        id: req.user.id
      }
    }
      }
    })

    res.status(201).json({
      message: "Course submitted successfully",
      course
    })

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

// Get pending courses (admin)
const getPendingCourses = async (req, res) => {
  try {

    const courses = await prisma.course.findMany({
      where: {
        status: "pending"
      },
      include: {
        category: true,
        submitter: true
      }
    })

    res.json(courses)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
// Approve course
const approveCourse = async (req, res) => {
  try {

    const { id } = req.params

    const course = await prisma.course.update({
      where: { id },
      data: {
        status: "approved",
        reviewer: {connect: { id: req.user.id }
},
        reviewed_at: new Date()
      }
    })

    res.json({
      message: "Course approved",
      course
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// Reject course
const rejectCourse = async (req, res) => {
  try {

    const { id } = req.params
    const { rejectionReason } = req.body

    const course = await prisma.course.update({
      where: { id },
      data: {
        status: "rejected",
        rejectionReason,
        reviewer: {
  connect: { id: req.user.id }
},
        reviewed_at: new Date()
      }
    })

    res.json({
      message: "Course rejected",
      course
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = {createCourse,getCourses,getCourseById,getPendingCourses,approveCourse,rejectCourse}