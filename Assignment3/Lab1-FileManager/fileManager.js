const fs = require("fs");
const path = require("path");

const command = process.argv[2];
const file = process.argv[3];
const data = process.argv[4];

switch(command){

case "read":
    fs.readFile(file,"utf8",(err,data)=>{
        if(err) return console.log("Error:",err.message);
        console.log(data);
    });
break;

case "write":
    fs.writeFile(file,data,(err)=>{
        if(err) return console.log("Error:",err.message);
        console.log("File written");
    });
break;

case "copy":
    fs.copyFile(file,data,(err)=>{
        if(err) return console.log("Error:",err.message);
        console.log("File copied");
    });
break;

case "delete":
    fs.unlink(file,(err)=>{
        if(err) return console.log("Error:",err.message);
        console.log("File deleted");
    });
break;

case "list":
    fs.readdir("./",(err,files)=>{
        if(err) return console.log(err);
        console.log("Files:",files);
    });
break;

default:
console.log("Commands: read write copy delete list");

}