/* eslint-disable no-unused-vars */
var os = require("os");
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}
console.log("Hệ điều hành   : " + os.type());
console.log("Nền tảng       : " + os.platform() + " " + os.arch() + " bit");
console.log("Tên máy        : " + os.hostname());
console.log("Số core CPU    : " + os.cpus().length);
console.log(
    "Dung lượng RAM : " +
        roundToTwo((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024) +
        " / " +
        roundToTwo(os.totalmem() / 1024 / 1024 / 1024) +
        "gb"
);
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ("IPv4" !== iface.family || iface.internal !== false) {
            return;
        }
        console.log("IP local       : " + iface.address);
        ++alias;
    });
});
const publicIp = require("public-ip");
(async () => {
    console.log("IP global      : " + (await publicIp.v4()));
})();
