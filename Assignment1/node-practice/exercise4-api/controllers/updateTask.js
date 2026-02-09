import fs from "fs";

function updateTask(req,res){
   const {id}=req.params;
   const {title}=req.body;
   let tasks = JSON.parse(fs.readFileSync("data/tasks.json"));
   const i = tasks.findIndex(t=>t.id==id);
   tasks[i].title = title;
   fs.writeFileSync("data/tasks.json",JSON.stringify(tasks,null,2));
   res.send("Updated");
}

export default updateTask;
