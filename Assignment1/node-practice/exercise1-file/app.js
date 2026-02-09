import fs from "fs";

fs.readFile("input.txt","utf-8",(err,data)=>{
    if(err){
        console.log("Error reading file");
        return;
    }
    const words = data.split(" ").length;
    fs.writeFile("output.txt","Word count : "+words,(err)=>{
        if(err) console.log("Error writing file");
        else console.log("File created successfully");
    });
});
