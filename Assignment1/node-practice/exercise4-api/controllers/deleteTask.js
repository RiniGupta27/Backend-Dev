import fs from "fs";

function deleteTask(req,res){
   const {id}=req.params;
   let tasks = JSON.parse(fs.readFileSync("data/tasks.json"));
   tasks = tasks.filter(t=>t.id!=id);
   fs.writeFileSync("data/tasks.json",JSON.stringify(tasks,null,2));
   res.send("Deleted");
}

export default deleteTask;
