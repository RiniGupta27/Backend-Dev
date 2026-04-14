import joi from "joi"
import { StatusCodes } from "http-status-pro-js"

export default function adminSignMidd(req,res,next){
    try{
        let schema = joi.object({
            name:joi.string().trim().min(3).max(100).lowercase().required(),
            email:joi.string().email().lowercase().pattern(/@admin\.com$/).required(),
            password:joi.string().alphanum().min(4).max(6).required(),
            basic_salary:joi.number().required()
        })

        let{error,value} = schema.validate(req.body)
        if(error){
            console.log("middleware/joi-error-block: ",error)
            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
        req.body = value
        next()
    }catch(err){
        console.log("middleware/signMiddleware: ",err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}