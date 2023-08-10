const express = require('express');
const app = express();
const { Worker } = require("worker_threads");
const path = require("path");
 
app.get('/', (req, res) => res.send('Hello, World')); 
app.get('/foo', (req, res) => { 
// we get the path of the script 
   const workerScript = path.join(__dirname, "./timeWorker.js");  
// create a new worker from our script 
   const worker = new    Worker(workerScript, {});
   worker.on("message", (msg) => res.send(msg));
}); 
app.listen(3000, () => console.log('app listening on port 3000'));
// timeWorker.js
const { parentPort, isMainThread } = require("worker_threads");
function busyWaitTime() {  
   let date = Date.now();
   let end = Date.now() + 10000;  
   /* Long Job Operation */  
   while (date < end) {  date = Date.now()  }   
   return "Done";
} 
// check that the sorter was called as a worker threadif (!isMainThread) {   
// we post a message through the parent port, to emit the "message" event  
parentPort.postMessage(busyWaitTime());
}