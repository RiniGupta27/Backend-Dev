import joi  from "joi"
import { StatusCodes } from "http-status-pro-js"

export default function adminLoginMidd(req,res,next){
    try{
        let schema = joi.object({
            email:joi.string().email().lowercase().required().pattern(/@admin\.com$/),
            password:joi.string().alphanum().min(4).max(6).required()
        })
    
        let{error,value} = schema.validate(req.body)
        if(error){
            console.log("middleware/login-joi-error: ",error)
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:"please fill all the details before login",
                data:null
            })
        }
        req.body = value
        next()
    }catch(err){
        console.log("middleware/loginmiddleware: ",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}