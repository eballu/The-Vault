const prisma = require("../utils/prisma")

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
    })

    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: "Category name is required" })
    }

    const existingCategory = await prisma.category.findFirst({
      where: { name }
    })

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists"
      })
    }

    const category = await prisma.category.create({
      data: { name }
    })

    res.status(201).json(category)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getCategories,
  createCategory
}