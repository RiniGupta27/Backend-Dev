import fs from "fs"

export function adminCreate(name, email, password,basic_salary){
    try{
        let adminOb = {
            id:Date.now(),
            name,
            email,
            password,
            basic_salary
        }
        let admins = [];
        if(fs.existsSync("Admin.json")){
            let data = JSON.parse(fs.readFileSync("Admin.json","utf-8"))
            if(!data){
                return null;
            }
            let adminAlready = data.find((value) => value.email === email)
            if(adminAlready){
                return null
            }
            admins = data
            fs.writeFileSync("Admin.json",JSON.stringify(admins,null,2))
        }
        admins.push(adminOb)
        fs.writeFileSync("Admin.json",JSON.stringify(admins,null,2))
        return true
    }catch(err){
        console.log("model/admin.model/adminCreate: ",err)
        return null
    }
}

export function adminExist(email){
    if(!fs.existsSync("Admin.json")){
        return null;
    }

    let data = JSON.parse(fs.readFileSync("Admin.json","utf-8"))
    let admin = data.find((value) => value.email === email)
    if(admin){
        return admin
    }
    return "this admin doesn't exist"
}

export function adminDelete(id){
    try{
        if(!fs.existsSync("Admin.json")){
            return null
        }
        let data = JSON.parse(fs.readFileSync("Admin.json","utf-8"));
        const isadmin = data.find((value)=>value.id === id);
        if(!isadmin){
            return null;
        }

        let admins = data.filter((value)=>value.id != id)
        fs.writeFileSync("Admin.json",JSON.stringify(admins,null,2))

        return true


    }catch(error){
        console.log("model/adminDelete: ",error)
        return null;
    }
}