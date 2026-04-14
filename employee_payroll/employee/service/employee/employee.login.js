import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import { employeeExist } from "../../model/employee/employee.model.js"

export default function employeeLogin(req,res,next){
 try{
    const {email, password} = req.body
    let employee = employeeExist(email);
    if(!employee){
        res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        return;
    }
    
    let isEmployee = bcrypt.compareSync(password, employee.password)
    if(!isEmployee){
        return res.status(StatusCodes.UNAUTHORIZED.code).json({
            code:StatusCodes.UNAUTHORIZED.code,
            message:"email or password maybe wrong",
            data:null
        })
    }

    const token = jwt.sign({id:employee.id}, process.env.TOKEN, {expiresIn:"12h"})
    res.status(StatusCodes.ACCEPTED.code).json({
        code:StatusCodes.ACCEPTED.code,
        message:"logged in successfully",
        data:{email:employee.email, token:token}
    })
    next()
    return;
    }catch(err){
        console.log("service/employee.login: ",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}