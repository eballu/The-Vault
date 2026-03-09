const prisma = require("../utils/prisma")

const getDepartments = async (req, res) => {
  try {

    const departments = await prisma.department.findMany({
      orderBy: {
        name: "asc"
      }
    })

    res.json(departments)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {getDepartments}