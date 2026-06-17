import fs from "fs";

function getTasks(req,res){
 const tasks = JSON.parse(fs.readFileSync("data/tasks.json"));
 res.json(tasks);
}

export default getTasks;

