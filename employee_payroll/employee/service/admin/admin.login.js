import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
// import { adminExist } from "../model/admin.model.js"
import { adminExist } from "../../model/admin/admin.model.js"

export default function adminLogin(req,res,next){
 try{
    const {email, password} = req.body
    let admin = adminExist(email);
    if(!admin){
        res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
        })
        return;
    }
    
    let isadmin = bcrypt.compareSync(password, admin.password)
    if(!isadmin){
        return res.status(StatusCodes.UNAUTHORIZED.code).json({
            code:StatusCodes.UNAUTHORIZED.code,
            message:"email or password maybe wrong",
            data:null
        })
    }

    const token = jwt.sign({id:admin.id}, process.env.TOKEN, {expiresIn:"12h"})
    res.status(StatusCodes.ACCEPTED.code).json({
        code:StatusCodes.ACCEPTED.code,
        message:"logged in successfully",
        data:{email:admin.email, token:token}
    })
    next()
    return;
    }catch(err){
        console.log("service/admin.login: ",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}