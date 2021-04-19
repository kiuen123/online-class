var os = require('os');

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

console.log("type: " + os.type());
console.log("Platform: " + os.platform() + " " + os.arch() + "bit");
console.log("Hostname: " + os.hostname());
console.log("Number of CPUs: " + os.cpus().length);
console.log("mem: " + roundToTwo(os.totalmem() / 1024 / 1024 / 1024) + "gb");