import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-pro-js";
import dotenv from "dotenv";

dotenv.config()

export default function employeeAuth(req,res){
    try{
        let authentication = req.headers.authorization;
        if(!authentication || !authentication.startsWith("Bearer")){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
            return;
        }

        const token = authentication.split(" ")[1];
        let employeeData = jwt.verify(token, process.env.TOKEN)
        req.body = employeeData.id;
        return res.status(StatusCodes.ACCEPTED.code).json({
            code:StatusCodes.ACCEPTED.code,
            message:"logged in successfully",
            data:{email:employee.email, token:token}
        })
    }catch(err){
        console.log("auth/employeeAuth.js: ",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}