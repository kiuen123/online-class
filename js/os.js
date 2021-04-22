var os = require('os');

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

console.log("Hệ điều hành  : " + os.type());
console.log("Nền tảng      : " + os.platform() + " " + os.arch() + " bit");
console.log("Tên máy       : " + os.hostname());
console.log("Số core CPU   : " + os.cpus().length);
console.log("Dung lượng RAM: " + roundToTwo((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024) + " / " + roundToTwo(os.totalmem() / 1024 / 1024 / 1024) + "gb");