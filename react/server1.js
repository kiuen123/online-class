var express = require("express");
var database = require("./server/database");
let path = require("path");
var fs = require("fs");
var app = express();

// đăng nhập
app.get("/checklogin", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var ten_dang_nhap = req.query.ten_dang_nhap;
    var mat_khau = req.query.mat_khau;
    database.checkUser(ten_dang_nhap, mat_khau, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách tên đăng nhập
app.get("/getlistacc", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getAllUserLogin(function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách email
app.get("/getlistmail", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getAllEmail(function (result) {
        console.log(result);
        res.json(result);
    });
});

// tạo folder
var createUserFolder = function (foldername) {
    try {
        if (!fs.existsSync(__dirname + "/public/uploads/" + foldername)) {
            fs.mkdirSync(__dirname + "/public/uploads/" + foldername);
        }
    } catch (err) {}
};

// đăng ký
app.get("/registeruser", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var ten_dang_nhap = req.query.ten_dang_nhap;
    var mat_khau = req.query.mat_khau;
    var email = req.query.email;
    var ten = req.query.ten;
    var vai_tro = req.query.vai_tro;
    var anh_dai_dien = req.query.anh_dai_dien;
    var tom_tat = req.query.tom_tat;
    createUserFolder(ten_dang_nhap);
    database.insertUser(ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat, function (result) {
        console.log(result);
    });
});

// lấy ảnh
app.get("/uploads/:id/:name", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.params.id;
    var name = req.params.name;
    res.sendFile(path.join(__dirname + "/public/uploads/" + id + "/" + name));
});

// lấy thông tin user
app.get("/getuser", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getUserById(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// sửa thông tin cá nhân
app.get("/updateuser", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var email = req.query.email;
    var ten = req.query.ten;
    var tom_tat = req.query.tom_tat;
    database.updateUser(id, email, ten, tom_tat, function (result) {
        console.log(result);
    });
});

// admin lấy tổng số user
app.get("/getallusercount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getAllUserCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getadmincount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getAdminCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getstudentcount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getStudentCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getteachercount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getTeacherCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getclasscount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getClassCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getpostcount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getPostCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getcmtcount", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getCmtCount(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/admingetallcomment", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.AdmingetAllComment(function (result) {
        console.log(result);
        res.json(result);
    });
});

// admin lấy toàn bộ thông tin user
app.get("/alluser", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getAllUser(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getallclass", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.getAllClass(function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/admingetallpost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    database.AdminGetAllPost(function (result) {
        console.log(result);
        res.json(result);
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
// tạo lớp học
app.get("/createclass", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var ten_lop = req.query.ten_lop;
    var giao_vien = req.query.giao_vien;
    var ngay_bat_dau = req.query.ngay_bat_dau;
    var ngay_ket_thuc = req.query.ngay_ket_thuc;
    var link_online = req.query.link_online;
    createClassFolder(ten_lop);
    database.insertClass(ten_lop, giao_vien, ngay_bat_dau, ngay_ket_thuc, link_online, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getliststore/:id", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.params.id;
    database.getAllStore(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/tangluotxem", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var link = req.query.link;
    database.tangluotxem(link, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy thông tin lớp học
app.get("/getclassbyid", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getByIdClass(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách lớp mà giáo viên đang dạy
app.get("/classlist", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id_giao_vien = req.query.id;
    database.getClassByIdTeacher(id_giao_vien, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách lớp mà học sinh đang tham gia
app.get("/learnlist", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id_hoc_sinh = req.query.id;
    database.getAllClassByIdStudent(id_hoc_sinh, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách lớp theo tên lớp
app.get("/classname", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var ten_lop = req.query.ten_lop;
    database.getClassByName(ten_lop, function (result) {
        console.log(result);
        res.json(result);
    });
});

// đăng kí lớp học
app.get("/joinclass", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    var id = req.query.id;
    database.joinClass(class_id, id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy tất cả bài viết trong lớp
app.get("/allpost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getAllPost(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/delpost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.deletePost(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/delcmtpost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.delcommentbypostid(id, function (result) {
        console.log(result);
        res.json(result);
    });
});
app.get("/delcarepost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.delcarebypostid(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy chi tiết bài viết
app.get("/postdetail", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getPost(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy tất cả comment của bài viết
app.get("/allcomment", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var post_id = req.query.post_id;
    database.getAllComment(post_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// thêm comment
app.get("/addcomment", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var post_id = req.query.post_id;
    var user_id = req.query.user_id;
    var noi_dung = req.query.noi_dung;
    var ngay_dang = req.query.ngay_dang;
    database.insertComment(post_id, user_id, noi_dung, ngay_dang, function (result) {
        console.log(result);
        res.json(result);
    });
});

// xóa comment
app.get("/deletecomment", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var cmt_id = req.query.cmt_id;
    database.deleteComment(cmt_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/deletecommentbypost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var post_id = req.query.post_id;
    database.deleteCommentbyPost(post_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

//thêm bài viết
app.get("/insertpost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var user_id = req.query.user_id;
    var class_id = req.query.class_id;
    var ten_bai_viet = req.query.ten_bai_viet;
    var noi_dung = req.query.noi_dung;
    var ngay_dang = req.query.ngay_dang;
    database.insertPost(user_id, class_id, ten_bai_viet, noi_dung, ngay_dang, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách học sinh trong lớp
app.get("/studentlist", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.id;
    database.getStudentList(class_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy thông tin user khác
app.get("/otheruser", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getOtherUserInfo(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách bài viết của nguoi dùng
app.get("/userpost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getPostbyUser(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy danh sách bài viết quan tâm
app.get("/usercarepost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getCarePostbyUser(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// thêm bài viết quan tâm
app.get("/carepost", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var user = req.query.user_id;
    var post = req.query.post_id;
    database.insertCarePost(user, post, function (result) {
        console.log(result);
        res.json(result);
    });
});

// xóa bài viết quan tâm
app.get("/delcare", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var user = req.query.user_id;
    var post = req.query.post_id;
    database.deleteCarePost(post, user, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lấy toàn bộ bài kiểm tra của lớp
app.get("/alltest", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    database.getTestbyClass(class_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// thêm mã điểm danh
app.get("/addcheckin", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    var code = req.query.code;
    var ngay = req.query.ngay;
    var thang = req.query.thang;
    var nam = req.query.nam;
    var luot_diem_danh = req.query.luot_diem_danh;
    database.insertCode(class_id, code, ngay, thang, nam, luot_diem_danh, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lay thong tin ma diem danh
app.get("/getcheckin", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    var ngay = req.query.ngay;
    var thang = req.query.thang;
    var nam = req.query.nam;
    database.getCode(class_id, ngay, thang, nam, function (result) {
        console.log(result);
        res.json(result);
    });
});

// tgan luot diem danh
app.get("/updatecheckin", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.tangluotdiemdanh(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// luu diem danh
app.get("/insertcheckin", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var user = req.query.user;
    var date = req.query.date;
    database.luudiemdanh(id, user, date, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lay danh sach diem danh
app.get("/getcheckinlist", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    var ngay = req.query.ngay;
    var thang = req.query.thang;
    var nam = req.query.nam;
    database.getChecklist(class_id, ngay, thang, nam, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/inserttest", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    var ten_bai_kiem_tra = req.query.ten_bai_kiem_tra;
    var noi_dung = req.query.noi_dung;
    var ngay_tao = req.query.ngay_tao;
    var thoi_gian_lam_bai = req.query.thoi_gian_lam_bai;
    database.insertTest(class_id, ten_bai_kiem_tra, noi_dung, ngay_tao, thoi_gian_lam_bai, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/gettest", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getTest(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// tang luot thi
app.get("/updatetest", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.tangluotlambai(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

//luu ket qua thi
app.get("/inserttestresult", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var user = req.query.user;
    var ket_qua = req.query.ket_qua;
    var ngay_lam = req.query.ngay_lam;
    database.luuketqua(id, user, ket_qua, ngay_lam, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lay ket qua thi
app.get("/gettestresult", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getTestresult(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// khai trừ user
app.get("/deleteuser", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.deleteUser(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// xoa hoc sinh
app.get("/deletestudent", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var class_id = req.query.class_id;
    database.deleteStudentByClass(id, class_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lay lich hoc
app.get("/getSchedule", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    database.getSchedule(class_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// them lich hoc
app.get("/insertSchedule", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    var thu = req.query.thu;
    var gio_bat_dau = req.query.gio_bat_dau;
    var gio_ket_thuc = req.query.gio_ket_thuc;
    database.insertSchedule(class_id, thu, gio_bat_dau, gio_ket_thuc, function (result) {
        console.log(result);
        res.json(result);
    });
});

// xoa lich hoc
app.get("/deleteSchedule", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var thu = req.query.thu;
    var gio_bat_dau = req.query.gio_bat_dau;
    var gio_ket_thuc = req.query.gio_ket_thuc;
    database.deleteSchedule(id, thu, gio_bat_dau, gio_ket_thuc, function (result) {
        console.log(result);
        res.json(result);
    });
});

// sua link online
app.get("/updateLink", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var link = req.query.link;
    database.updateLink(id, link, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getcheckpointByClass", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var class_id = req.query.class_id;
    database.getcheckpointByClass(class_id, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.get("/getchecklistById", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var user = req.query.user;
    database.getchecklistById(id, user, function (result) {
        console.log(result);
        res.json(result);
    });
});

// lay bai kiem tra theo id
app.get("/getTestById", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    database.getTestById(id, function (result) {
        console.log(result);
        res.json(result);
    });
});

// sua bai kiem tra theo id
app.get("/updateTestbyid", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.query.id;
    var ten_bai_kiem_tra = req.query.ten_bai_kiem_tra;
    var noi_dung = req.query.noi_dung;
    var thoi_gian_lam_bai = req.query.thoi_gian_lam_bai;
    database.updateTestbyid(id, ten_bai_kiem_tra, noi_dung, thoi_gian_lam_bai, function (result) {
        console.log(result);
        res.json(result);
    });
});

app.listen(4000);
