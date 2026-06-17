import fs from "fs";

function logger(type,msg){
 const log = `[${new Date()}] ${type}: ${msg}\n`;
 fs.appendFileSync("utils/log.txt",log);
}

export default logger;
