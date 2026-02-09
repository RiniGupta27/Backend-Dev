const fs = require("fs");
const path = require("path");

const source = "./source";
const dest = "./destination";

fs.readdir(source,(err,files)=>{
  if(err) return console.log(err);

  files.forEach(file=>{
    const srcFile = path.join(source,file);
    const destFile = path.join(dest,file);

    if(!fs.existsSync(destFile)){
      fs.copyFileSync(srcFile,destFile);
      console.log("Copied:",file);
    }else{
      console.log("Already exists:",file);
    }
  });
});