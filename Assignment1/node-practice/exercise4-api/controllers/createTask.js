import fs from "fs";
import logger from "../utils/logger.js";

function createTask(req,res){
   const {title}=req.body;
   let tasks = JSON.parse(fs.readFileSync("data/tasks.json"));
   const task = {id:Date.now(),title};
   tasks.push(task);
   fs.writeFileSync("data/tasks.json",JSON.stringify(tasks,null,2));
   logger("CREATE",title);
   res.send("Task created");
}

export default createTask;
