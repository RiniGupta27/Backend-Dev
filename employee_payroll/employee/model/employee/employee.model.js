import fs from "fs"

export function employeeCreate(name, email, password,department,basic_salary){
    try{
        let employeeOb = {
            id:Date.now(),
            name,
            email,
            password,
            department,
            basic_salary
        }
        let employees = [];
        if(fs.existsSync("Employee.json")){
            let data = JSON.parse(fs.readFileSync("Employee.json","utf-8"))
            if(!data){
                return null;
            }
            let employeeAlready = data.find((value) => value.email === email)
            if(employeeAlready){
                return null
            }
            employees = data
            fs.writeFileSync("Employee.json",JSON.stringify(employees,null,2))
        }
        employees.push(employeeOb)
        fs.writeFileSync("Employee.json",JSON.stringify(employees,null,2))
        return true
    }catch(err){
        console.log("model/employee.model/employeeCreate: ",err)
        return null
    }
}

export function employeeExist(email){
    if(!fs.existsSync("Employee.json")){
        return null;
    }

    let data = JSON.parse(fs.readFileSync("Employee.json","utf-8"))
    let employee = data.find((value) => value.email === email)
    if(employee){
        return employee
    }
    return "this employee doesn't exist"
}

export function Delete(id){
    try{
        if(!fs.existsSync("Employee.json")){
            return null
        }
        let data = JSON.parse(fs.readFileSync("Employee.json","utf-8"));
        const isEmployee = data.find((value)=>value.id === id);
        if(!isEmployee){
            return null;
        }

        let employees = data.filter((value)=>value.id != id)
        fs.writeFileSync("Employee.json",JSON.stringify(employees,null,2))

        return true


    }catch(error){
        console.log("model/employeeDelete: ",error)
        return null;
    }
}