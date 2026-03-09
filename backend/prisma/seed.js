const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  // Departments (for staff)
  const departments = [
    { name: "Technology Consulting" },
    { name: "Assurance" },
    { name: "Tax" },
    { name: "Strategy & Transactions" },
    { name: "Risk Consulting" },
    { name: "Data & Analytics" },
    { name: "Cybersecurity" },
    { name: "Cloud Engineering" },
    { name: "Internal Operations" },
    { name: "Human Resources" },
    { name: "EY Technology (IT)" }
  ]

  for (const dept of departments) {
    await prisma.department.create({
      data: dept
    })
  }

  // Course categories
  const categories = [
    { name: "Cloud Computing" },
    { name: "Cybersecurity" },
    { name: "Data Analytics" },
    { name: "Artificial Intelligence" },
    { name: "Machine Learning" },
    { name: "Audit Tools" },
    { name: "Financial Analysis" },
    { name: "SAP" },
    { name: "Project Management" },
    { name: "Software Development" },
    { name: "DevOps" },
    { name: "Business Intelligence" },
    { name: "Excel & Data Tools" },
    { name: "Soft Skills" },
    { name: "Leadership & Management" }
  ]

  for (const category of categories) {
    await prisma.category.create({
      data: category
    })
  }

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })