const express = require("express");
const cors = require('cors');
const dotenv =require("dotenv"); 


const authRoutes = require("./routes/auth.routes.js");
const departmentRoutes = require("./routes/department.routes");
const categoryRoutes = require("./routes/category.routes.js")

dotenv.config()

const app = express()

app.use(cors({
  origin: "*"
}))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/departments", departmentRoutes)
app.use("/api/categories",categoryRoutes)

app.get("/", (req,res)=>{
  res.send("Vault API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})