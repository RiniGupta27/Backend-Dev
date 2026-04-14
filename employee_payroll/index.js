import express from "express"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"
import router from "./employee/router/app.route.js"


dotenv.config()
const app = express()
app.set('view engine','ejs')
app.use(helmet())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000
app.get("/home",(req,res)=>{
    res.render("index")
})
app.use("/employee",router)
app.use("/admin",router)
app.listen(port, ()=>{
    console.log("connected to the server.")
})