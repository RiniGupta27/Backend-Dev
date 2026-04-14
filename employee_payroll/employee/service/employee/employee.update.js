import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import fs from "fs"

export default function employeeUpdate(req, res) {
    try {
        let { email, password, name, department, basic_salary } = req.body

        if (!fs.existsSync("Employee.json")) {
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "employee not found"
            })
        }

        let data = JSON.parse(fs.readFileSync("Employee.json", "utf-8"))

        let index = data.findIndex((value) => value.email === email)

        if (index === -1) {
            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "employee not found"
            })
        }

        let isMatch = bcrypt.compareSync(password, data[index].password)

        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "you are not allowed to make changes to this employee"
            })
        }
        data[index].name = name
        data[index].department = department
        data[index].basic_salary = basic_salary

        fs.writeFileSync("Employee.json", JSON.stringify(data, null, 2))

        return res.status(StatusCodes.ACCEPTED.code).json({
            code: StatusCodes.ACCEPTED.code,
            message: "employee details updated"
        })

    } catch (error) {
        console.log("service/employeeUpdate: ", error)

        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message
        })
    }
}
