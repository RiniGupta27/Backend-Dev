const fs = require("fs");
const readline = require("readline");

let errorCount = 0;
let infoCount = 0;

const stream = fs.createReadStream("server.log");

const rl = readline.createInterface({
  input: stream,
  crlfDelay: Infinity
});

rl.on("line",(line)=>{
  if(line.includes("ERROR")) errorCount++;
  if(line.includes("INFO")) infoCount++;
});

rl.on("close",()=>{
  console.log("Log Summary");
  console.log("Errors:",errorCount);
  console.log("Info:",infoCount);
});