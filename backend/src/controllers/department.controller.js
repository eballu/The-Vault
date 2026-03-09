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
const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await prisma.department.findFirst({
      where: { name }
    });

    if (existing) {
      return res.status(400).json({ error: "Department already exists" });
    }

    const department = await prisma.department.create({
      data: { name }
    });

    res.status(201).json(department);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getDepartments, createDepartment}