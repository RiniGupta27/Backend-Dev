import joi from "joi"
import { StatusCodes } from "http-status-pro-js"

export default function adminUpdateMidd(req,res,next){
    try {
        let schema = joi.object({
            name:joi.string().trim().min(3).max(100).lowercase(),
            email:joi.string().email().lowercase().pattern(/@admin\.com$/).required(),
            password:joi.string().alphanum().min(4).max(6).required(),
            basic_salary:joi.number()
        })
    
        let{error,value} = schema.validate(req.body)
    
        if(error){
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
    
        req.body = value
        next()    
    } catch (error) {
        console.log("middleware/updateMiddleware: ",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }

}