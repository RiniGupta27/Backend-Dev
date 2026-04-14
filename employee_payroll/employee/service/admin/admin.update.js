import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import fs from "fs"

export default function adminUpdate(req, res) {
    try {
        let { email, password, name, basic_salary } = req.body

        if (!fs.existsSync("admin.json")) {
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "admin not found"
            })
        }

        let data = JSON.parse(fs.readFileSync("admin.json", "utf-8"))

        let index = data.findIndex((value) => value.email === email)

        if (index === -1) {
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "admin not found"
            })
        }

        let isMatch = bcrypt.compareSync(password, data[index].password)

        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "you are not allowed to make changes to this admin"
            })
        }
        data[index].name = name
        data[index].basic_salary = basic_salary

        fs.writeFileSync("admin.json", JSON.stringify(data, null, 2))

        return res.status(StatusCodes.ACCEPTED.code).json({
            code: StatusCodes.ACCEPTED.code,
            message: "admin details updated"
        })

    } catch (error) {
        console.log("service/adminUpdate: ", error)

        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message
        })
    }
}
