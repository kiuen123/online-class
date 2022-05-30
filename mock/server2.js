let express = require("express");
let multer = require("multer");
let path = require("path");
var fs = require("fs");
var database = require("./server/database");
let app = express();

var currentdate = new Date();
var datetime =
    currentdate.getDate() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getFullYear() +
    "_" +
    currentdate.getHours() +
    "-" +
    currentdate.getMinutes() +
    "-" +
    currentdate.getSeconds();
// Route này trả về cái form upload cho client
app.get("/", (req, res) => {
    res.sendFile(path.join(`${__dirname}/views/master.html`));
});

// tạo folder
var createFolder = function (foldername) {
    try {
        if (!fs.existsSync(__dirname + "/public/uploads/" + foldername)) {
            fs.mkdirSync(__dirname + "/public/uploads/" + foldername);
        }
    } catch (err) {}
};
app.post("/uploadfile/:ten_dang_nhap", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var ten_dang_nhap = req.params.ten_dang_nhap;
    var foldername = ten_dang_nhap;
    createFolder(foldername);
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, __dirname + "/public/uploads/" + foldername);
            },
            filename: (req, file, callback) => {
                let math = ["image/png", "image/jpeg"];
                if (math.indexOf(file.mimetype) === -1) {
                    let err = new Error("Chỉ được upload file ảnh");
                    return callback(err);
                }
                let filename = `${foldername}-${datetime}.jpg`;
                var pathtosave = "/uploads/" + foldername + "/" + filename;
                database.updateImgUser(ten_dang_nhap, pathtosave, function (result) {
                    console.log(result);
                    res.json(result);
                });
                callback(null, filename);
            },
        }),
    }).single("file")(req, res, (error) => {
        if (error) {
            res.json({ error: error });
        }
    });
});

// tạo folder
var createClassFolder = function (foldername) {
    try {
        if (!fs.existsSync(__dirname + "/public/class/" + foldername)) {
            fs.mkdirSync(__dirname + "/public/class/" + foldername);
        }
    } catch (err) {}
};
app.post("/addstore/:id/:ten_lop/:tenfile", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.params.id;
    var ten_lop = req.params.ten_lop;
    var tenfile = req.params.tenfile;
    var foldername = ten_lop;
    createClassFolder(foldername);
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, __dirname + "/public/class/" + foldername);
            },
            filename: (req, file, callback) => {
                let filename = `${tenfile}`;
                var pathtosave = "/class/" + foldername + "/" + tenfile;
                database.insertStore(id, pathtosave,datetime, function (result) {
                    console.log(result);
                    res.json(result);
                });
                callback(null, filename);
            },
        }),
    }).single("file")(req, res, (error) => {
        if (error) {
            res.json({ error: error });
        }
    });
});

app.listen(5000);
