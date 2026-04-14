import { StatusCodes } from "http-status-pro-js";
// import { adminDelete } from "../model/admin.model.js";
import { adminDelete } from "../../model/admin/admin.model.js";

export default function Delete(req,res){
    try{
        let adminid  = req.params.id
        adminid = Number(adminid)
        let deleteadmin = adminDelete(adminid)
        if(!deleteadmin){
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"admin with this id doesn't exist or already deleted"
            })
        }
        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"admin deleted"
        })
    }catch(error){
        console.log("service/admindelete: ",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:"some server error occurred while deleting"

        })
    }
}