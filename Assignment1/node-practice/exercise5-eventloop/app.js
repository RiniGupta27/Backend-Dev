console.log("Start");

setTimeout(()=>console.log("Timeout"),0);
setImmediate(()=>console.log("Immediate"));
process.nextTick(()=>console.log("NextTick"));
Promise.resolve().then(()=>console.log("Promise"));

console.log("End");
