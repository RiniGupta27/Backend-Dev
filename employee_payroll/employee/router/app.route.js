import express from "express"

//import for Authentication layer
import employeeAuth from "../auth/employeeAuth.js"
import adminAuth from "../auth/adminAuth.js"


//import for middleware layer

//employee
import employeeSignMidd from "../middleware/employee/signupMiddleware.js"
import employeeLoginMidd from "../middleware/employee/loginMiddleware.js"
import employeeUpdateMidd from "../middleware/employee/updateMiddleware.js"
//admin
import adminUpdateMidd from "../middleware/admin/admin.updateMiddleware.js"
import adminLoginMidd from "../middleware/admin/admin.loginMiddleware.js"
import adminSignMidd from "../middleware/admin/admin.signupMiddleware.js"


//import for service layer

//employee
import employeeUpdate from "../service/employee/employee.update.js"
import EmployeeDelete from "../service/employee/employee.delete.js"
import employeeLogin from "../service/employee/employee.login.js"
import employeeSignup from "../service/employee/employee.signup.js"

//admin
import adminSignup from "../service/admin/admin.signup.js"
import adminLogin from "../service/admin/admin.login.js"
import adminUpdate from "../service/admin/admin.update.js"
import Delete from "../service/admin/admin.delete.js"
let router = express.Router()

//routes for employees
router.post("/signup",employeeSignMidd,employeeSignup)
router.post("/login",employeeLoginMidd,employeeLogin,employeeAuth)
router.patch("/update",employeeUpdateMidd,employeeUpdate)
router.delete("/delete/:id",EmployeeDelete)


//routes for admin
router.post("/signup",adminSignMidd,adminSignup)
router.post("/login",adminLoginMidd,adminLogin,adminAuth)
router.patch("/update",adminUpdateMidd,adminUpdate)
router.delete("/delete/:id",Delete)



export default router