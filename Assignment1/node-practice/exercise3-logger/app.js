import os from "os";
import fs from "fs";

setInterval(()=>{
    const info =
    "CPU: "+os.cpus().length+
    " | Memory: "+os.freemem()+
    " | Platform: "+os.platform()+"\n";

    fs.appendFileSync("system.txt",info);
    console.log("Logged...");
},5000);
