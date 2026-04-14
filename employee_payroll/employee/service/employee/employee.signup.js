import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import { employeeCreate } from "../../model/employee/employee.model.js"

export default function employeeSignup(req,res){
    try{
        let {name,email,password,department,basic_salary} = req.body
        let salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        password = hashPassword
        
        let data = employeeCreate(name,email,password,department,basic_salary)
        if(!data){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR.code,
                message:StatusCodes.INTERNAL_SERVER_ERROR.message,
                data:null
           })
           return;
        }

        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:null
        })
    }catch(error){
        console.log("service/employee.signup: ",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}