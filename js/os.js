var os = require('os');

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

console.log("Type: " + os.type());
console.log("Platform: " + os.platform() + " " + os.arch() + "bit");
console.log("Hostname: " + os.hostname());
console.log("Core CPU: " + os.cpus().length);
console.log("Memories: " + roundToTwo(os.totalmem() / 1024 / 1024 / 1024) + "gb");