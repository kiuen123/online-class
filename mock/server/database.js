/* eslint-disable no-unused-vars */
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ktechlab",
});

var connect = function () {
    connection.connect(function (err) {
        if (!err) {
            console.log("db connect ok");
        } else {
            console.log("db connect fail");
        }
    });
};

var close = function () {
    connection.end(function (err) {
        if (!err) {
            console.log("db close");
        } else {
            console.log("db close fail");
        }
    });
};

// login
exports.checkUser = function (ten_dang_nhap, mat_khau, callback) {
    connect();
    connection.query(
        "SELECT id,ten_dang_nhap,mat_khau,vai_tro FROM users WHERE ten_dang_nhap='" + ten_dang_nhap + "' ",
        function (err, res, fields) {
            if (!err) {
                if (res.length > 0) {
                    if (res[0].mat_khau === mat_khau) {
                        callback(res[0]);
                    }
                } else {
                    callback("some thing wrong");
                }
            } else {
                console.log(err);
            }
        }
    );
};

// lấy danh sách tên đăng nhập
exports.getAllUserLogin = function (callback) {
    connect();
    connection.query("SELECT ten_dang_nhap FROM users", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// lấy danh sách gmail
exports.getAllEmail = function (callback) {
    connect();
    connection.query("SELECT email FROM users", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// register
exports.insertUser = function (ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat, callback) {
    connect();
    connection.query(
        `INSERT INTO users( ten_dang_nhap, mat_khau, email, ten, vai_tro, anh_dai_dien, tom_tat) VALUES ('${ten_dang_nhap}','${mat_khau}','${email}','${ten} ','${vai_tro} ','${anh_dai_dien} ','${tom_tat} ')`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// role
exports.getAllRole = function (callback) {
    connect();
    connection.query(`SELECT * FROM role`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// user
exports.getAllUser = function (callback) {
    connect();
    connection.query(
        `SELECT users.id,users.ten_dang_nhap,users.ten,role.ten_vai_tro,users.anh_dai_dien,users.email,users.tom_tat FROM users,role WHERE users.vai_tro = role.id`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getAllUserCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM users`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getAdminCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM users WHERE vai_tro = 1`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getStudentCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM users WHERE vai_tro = 2`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getTeacherCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM users WHERE vai_tro = 3`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getClassCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM class `, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getPostCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM post `, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getCmtCount = function (callback) {
    connect();
    connection.query(`SELECT COUNT(id) AS number FROM comment `, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getUserById = function (id, callback) {
    connect();
    connection.query(
        `SELECT id,ten_dang_nhap,ten,vai_tro,anh_dai_dien,email,tom_tat FROM users where id = ${id}`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getStudentList = function (class_id, callback) {
    connect();
    connection.query(
        `SELECT users.id,users.ten FROM class,learn,users WHERE class.id=learn.class AND users.id=learn.student AND class = ${class_id}`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.updateUser = function (id, email, ten, tom_tat, callback) {
    connect();
    connection.query(
        "UPDATE users SET " +
            "email='" +
            email +
            "'," +
            "ten='" +
            ten +
            "'," +
            "tom_tat='" +
            tom_tat +
            "' " +
            "WHERE id=" +
            id +
            "",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.updateImgUser = function (ten_dang_nhap, anh_dai_dien, callback) {
    connect();
    connection.query(
        `UPDATE users SET anh_dai_dien='${anh_dai_dien}' WHERE ten_dang_nhap='${ten_dang_nhap}'`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.deleteUser = function (id, callback) {
    connect();
    connection.query("DELETE FROM users WHERE id='" + id + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// xoa toan bo binh luan cua bai viet
exports.deleteCmtByPost = function (post_id, callback) {
    connect();
    connection.query(`DELETE FROM comment WHERE bai_viet = ${post_id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// xoa toan bo quan tam cua bai viet
exports.deleteLikeByPost = function (post_id, callback) {
    connect();
    connection.query(`DELETE FROM carepost WHERE post = ${post_id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// xoa toan bo bai viet cua ng dung theo lop
exports.deletePostByClass = function (class_id, callback) {
    connect();
    connection.query(`DELETE FROM post WHERE class = ${class_id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// xoa hoc sinh khoi lop hoc
exports.deleteStudentByClass = function (id, class_id, callback) {
    connect();
    connection.query(`DELETE FROM learn WHERE class = ${class_id} AND student = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// tất cả các tên đăng nhập tránh trùng
exports.getAllUserLogin = function (callback) {
    connect();
    connection.query("SELECT ten_dang_nhap FROM users", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// class
exports.getAllClass = function (callback) {
    connect();
    connection.query(
        "SELECT class.id,class.ten_lop,users.ten,COUNT(learn.student) AS studentcount FROM class,users,learn WHERE class.giao_vien=users.id AND class.id=learn.class GROUP BY class.id",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getByIdClass = function (id, callback) {
    connect();
    connection.query(
        "SELECT class.id,class.ten_lop,users.ten,class.giao_vien,users.anh_dai_dien,class.ngay_bat_dau,class.ngay_ket_thuc,class.link_online FROM class,users where class.id=" +
            id +
            " AND class.giao_vien=users.id",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.insertClass = function (ten_lop, giao_vien, ngay_bat_dau, ngay_ket_thuc, link_online, callback) {
    connect();
    connection.query(
        "INSERT INTO class(ten_lop, giao_vien, ngay_bat_dau, ngay_ket_thuc, link_online) VALUES ('" +
            ten_lop +
            "','" +
            giao_vien +
            "','" +
            ngay_bat_dau +
            "','" +
            ngay_ket_thuc +
            "','" +
            link_online +
            "')",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getClassByIdTeacher = function (id_giao_vien, callback) {
    connect();
    connection.query("SELECT * FROM class WHERE giao_vien=" + id_giao_vien + "", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getClassByName = function (ten_lop, callback) {
    connect();
    connection.query(
        "SELECT class.id,class.ten_lop,users.ten,users.anh_dai_dien FROM class,users WHERE ten_lop LIKE '%" +
            ten_lop +
            "%' AND class.giao_vien = users.id",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.updateClass = function (id, ten_lop, callback) {
    connect();
    connection.query("UPDATE class SET ten_lop='" + ten_lop + "'WHERE id='" + id + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.deleteClass = function (id, callback) {
    connect();
    connection.query("DELETE FROM class WHERE id='" + id + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// post
exports.getPost = function (id, callback) {
    connect();
    connection.query("SELECT * FROM post where id = " + id + "", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.AdminGetAllPost = function (callback) {
    connect();
    connection.query(
        `SELECT post.id,users.ten,class.ten_lop,post.ten_bai_viet,post.ngay_dang 
        FROM post,users,class 
        WHERE post.nguoi_viet=users.id AND post.class= class.id`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getAllPost = function (id, callback) {
    connect();
    connection.query("SELECT * FROM post where class = " + id + "  GROUP BY id DESC", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.insertPost = function (nguoi_viet, lop, ten_bai_viet, noi_dung, ngay_dang, callback) {
    connect();
    connection.query(
        "INSERT INTO post(nguoi_viet, class,ten_bai_viet, noi_dung, ngay_dang)" +
            " VALUES ('" +
            nguoi_viet +
            "','" +
            lop +
            "','" +
            ten_bai_viet +
            "','" +
            noi_dung +
            "','" +
            ngay_dang +
            "')",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.updatePost = function (id, ten_bai_viet, noi_dung, callback) {
    connect();
    connection.query(
        "UPDATE post SET ten_bai_viet='" +
            ten_bai_viet +
            "'," +
            "noi_dung='" +
            noi_dung +
            "'," +
            "WHERE id='" +
            id +
            "'",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.deletePost = function (id, callback) {
    connect();
    connection.query(`DELETE FROM post WHERE id= ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getPostbyUser = function (id, callback) {
    connect();
    connection.query(`SELECT * FROM post where nguoi_viet = ${id} GROUP BY id DESC`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getCarePostbyUser = function (id, callback) {
    connect();
    connection.query(
        "SELECT post.id,post.nguoi_viet,post.ten_bai_viet,post.noi_dung,post.ngay_dang FROM post,carepost where carepost.user = " +
            id +
            " AND post.id = carepost.post GROUP BY id DESC",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.insertCarePost = function (user_id, post_id, callback) {
    connect();
    connection.query("INSERT INTO carepost VALUES (" + user_id + "," + post_id + ")", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.deleteCarePost = function (post_id, user_id, callback) {
    connect();
    connection.query(
        "DELETE FROM carepost where post = " + post_id + " AND user=" + user_id,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.delcommentbypostid = function (id, callback) {
    connect();
    connection.query(`DELETE FROM comment WHERE bai_viet=${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.delcarebypostid = function (id, callback) {
    connect();
    connection.query(`DELETE FROM carepost WHERE post=${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};
// comment
exports.getAllComment = function (post_id, callback) {
    connect();
    connection.query(
        "SELECT comment.id,comment.nguoi_viet,users.ten,comment.noi_dung,comment.ngay_dang,users.anh_dai_dien FROM comment,users where comment.bai_viet=" +
            post_id +
            " AND comment.nguoi_viet = users.id",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.AdmingetAllComment = function (callback) {
    connect();
    connection.query(
        `SELECT comment.id,users.ten,comment.noi_dung,comment.ngay_dang 
        FROM comment,users 
        WHERE comment.nguoi_viet = users.id`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.insertComment = function (bai_viet, nguoi_viet, noi_dung, ngay_dang, callback) {
    connect();
    connection.query(
        "INSERT INTO comment(bai_viet, nguoi_viet, noi_dung, ngay_dang)" +
            " VALUES ('" +
            bai_viet +
            "','" +
            nguoi_viet +
            "','" +
            noi_dung +
            "','" +
            ngay_dang +
            "')",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.updateComment = function (id, noi_dung, callback) {
    connect();
    connection.query(
        "UPDATE comment SET noi_dung='" + noi_dung + "' WHERE id='" + id + "'",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.deleteComment = function (id, callback) {
    connect();
    connection.query("DELETE FROM comment WHERE id='" + id + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.deleteCommentbyPost = function (id, callback) {
    connect();
    connection.query("DELETE FROM comment WHERE bai_viet='" + id + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// tham gia lớp học
exports.getAllStudent = function (lop, callback) {
    connect();
    connection.query("SELECT * FROM learn where class='" + lop + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getAllClassByIdStudent = function (id, callback) {
    connect();
    connection.query(
        "SELECT DISTINCT * FROM learn,class where student='" + id + "' AND class.id=learn.class",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.joinClass = function (lop, hoc_vien, callback) {
    connect();
    connection.query(
        "INSERT INTO learn(class, student) VALUES (" + lop + "," + hoc_vien + ")",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.outClass = function (lop, hoc_vien, callback) {
    connect();
    connection.query(
        "DELETE FROM learn WHERE class='" + lop + "' AND student='" + hoc_vien + "'",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getOtherUserInfo = function (id, callback) {
    connect();
    connection.query(
        "SELECT users.id,users.ten,users.email,role.ten_vai_tro,users.anh_dai_dien,users.tom_tat FROM users,role WHERE users.vai_tro=role.id AND users.id=" +
            id +
            "",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.getAllStore = function (id, callback) {
    connect();
    connection.query("SELECT * FROM store WHERE class = " + id, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.insertStore = function (id, link, ngay_dang, callback) {
    connect();
    connection.query(
        "INSERT INTO store VALUES (" + id + ",'" + link + "','" + ngay_dang + "',0)",
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

exports.tangluotxem = function (link, callback) {
    connect();
    connection.query("UPDATE store SET luot_xem = luot_xem+1 WHERE link ='" + link + "'", function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getTestbyClass = function (id, callback) {
    connect();
    connection.query("SELECT * FROM test WHERE class = " + id, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// thêm mã điểm danh
exports.insertCode = function (class_id, code, ngay, thang, nam, luot_diem_danh, callback) {
    connect();
    connection.query(
        `INSERT INTO checkpoint( class, code, ngay, thang, nam,luot_diem_danh) VALUES (${class_id},'${code}',${ngay},${thang},${nam},${luot_diem_danh})`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// tang luot diem danh
exports.tangluotdiemdanh = function (id, callback) {
    connect();
    connection.query(
        `UPDATE checkpoint SET luot_diem_danh = luot_diem_danh+1 WHERE id = ${id}`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// lưu điểm danh
exports.luudiemdanh = function (id, user, date, callback) {
    connect();
    connection.query(`INSERT INTO checklist VALUES (${id},${user},'${date}')`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// lay thong tin ma diem danh
exports.getCode = function (class_id, ngay, thang, nam, callback) {
    connect();
    connection.query(
        `SELECT * FROM checkpoint WHERE class='${class_id}' AND ngay = ${ngay} AND thang = ${thang} AND nam = ${nam}`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// danh sach hoc vien da diem danh
exports.getChecklist = function (id, ngay, thang, nam, callback) {
    connect();
    connection.query(
        `SELECT checklist.user,users.ten,checklist.date FROM checklist,checkpoint,users WHERE class = ${id} AND ngay = ${ngay} AND thang = ${thang} AND nam = ${nam} AND checkpoint.id=checklist.id AND checklist.user=users.id`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// them bai kiem tra
exports.insertTest = function (class_id, ten_bai_kiem_tra, noi_dung, ngay_tao, thoi_gian_lam_bai, callback) {
    connect();
    connection.query(
        `INSERT INTO test(class, ten_bai_kiem_tra, noi_dung, ngay_tao, luot_lam_bai,thoi_gian_lam_bai) VALUES (${class_id},'${ten_bai_kiem_tra}','${noi_dung}','${ngay_tao}',0,'${thoi_gian_lam_bai}')`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// lay thong tin bai kiem tra
exports.getTest = function (id, callback) {
    connect();
    connection.query(`SELECT * FROM test WHERE id = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// tang luot lam bai
exports.tangluotlambai = function (id, callback) {
    connect();
    connection.query(`UPDATE test SET luot_lam_bai = luot_lam_bai+1 WHERE id = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// luu ket qua bai kiem tra
exports.luuketqua = function (id, user, ket_qua, ngay_lam, callback) {
    connect();
    connection.query(
        `INSERT INTO testresult VALUES (${id},${user},${ket_qua},'${ngay_lam}')`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// lay ket qua bai kiem tra
exports.getTestresult = function (id, callback) {
    connect();
    connection.query(
        `SELECT test.id,users.ten,testresult.ket_qua,testresult.ngay_lam,test.ten_bai_kiem_tra
        FROM testresult,test, users
        WHERE test.id = ${id} AND testresult.id_test = test.id AND testresult.id_user= users.id
        ORDER BY testresult.id_test DESC`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// lay lich hoc
exports.getSchedule = function (id, callback) {
    connect();
    connection.query(`SELECT * FROM learntime WHERE id = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// them lich hoc
exports.insertSchedule = function (id, thu, gio_bat_dau, gio_ket_thuc, callback) {
    connect();
    connection.query(
        `INSERT INTO learntime VALUES (${id},'${thu}','${gio_bat_dau}','${gio_ket_thuc}')`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// xoa lich hoc
exports.deleteSchedule = function (id, thu, gio_bat_dau, gio_ket_thuc, callback) {
    connect();
    connection.query(
        `DELETE FROM learntime WHERE id = ${id} AND thu = "${thu}" AND gio_bat_dau = "${gio_bat_dau}" AND gio_ket_thuc = "${gio_ket_thuc}"`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};

// sua link online
exports.updateLink = function (id, link, callback) {
    connect();
    connection.query(`UPDATE class SET link_online = '${link}' WHERE id = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

exports.getcheckpointByClass = function (id, callback) {
    connect();
    connection.query(`SELECT * FROM checkpoint WHERE class = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};
exports.getchecklistById = function (id, user, callback) {
    connect();
    connection.query(`SELECT * FROM checklist WHERE id = ${id} AND user=${user}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// lau bai kiem tra theo id
exports.getTestById = function (id, callback) {
    connect();
    connection.query(`SELECT * FROM test WHERE id = ${id}`, function (err, res, fields) {
        if (!err) {
            callback(res);
        } else {
            console.log(err);
        }
    });
};

// sua bai kiem tra theo id
exports.updateTestbyid = function (id, ten_bai_kiem_tra, noi_dung, thoi_gian_lam_bai, callback) {
    connect();
    connection.query(
        `UPDATE test SET ten_bai_kiem_tra = '${ten_bai_kiem_tra}', noi_dung = '${noi_dung}', thoi_gian_lam_bai = '${thoi_gian_lam_bai}' WHERE id = ${id}`,
        function (err, res, fields) {
            if (!err) {
                callback(res);
            } else {
                console.log(err);
            }
        }
    );
};
