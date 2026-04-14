import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import { adminCreate } from "../../model/admin/admin.model.js"

export default function adminSignup(req,res){
    try{
        let {name,email,password,basic_salary} = req.body
        let salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        password = hashPassword
        
        let data = adminCreate(name,email,password,basic_salary)
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
        console.log("service/admin.signup: ",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}