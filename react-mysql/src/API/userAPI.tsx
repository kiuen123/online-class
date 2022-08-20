import axios from "axios";

// đăng nhập
const Checklogin = function (ten: any, pass: any, callback: any) {
    axios({
        url: `http://localhost:4000/checklogin`,
        method: "get",
        params: {
            ten_dang_nhap: ten,
            mat_khau: pass,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export default Checklogin;

// lấy danh sách tên đăng nhập
const GetUserName = function (callback: any) {
    axios({
        url: `http://localhost:4000/getlistacc`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { GetUserName };

// lấy danh sách tên đăng nhập
const GetUserMail = function (callback: any) {
    axios({
        url: `http://localhost:4000/getlistmail`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { GetUserMail };

// đăng ký
const RegisterUser = function (
    ten_dang_nhap: string,
    mat_khau: string,
    email: string,
    ten: string,
    vai_tro: string,
    tom_tat: string,
    callback: any
) {
    axios({
        url: `http://localhost:4000/registeruser`,
        method: "get",
        params: {
            ten_dang_nhap: ten_dang_nhap,
            mat_khau: mat_khau,
            email: email,
            ten: ten,
            vai_tro: vai_tro,
            anh_dai_dien: "/uploads/default/user.png",
            tom_tat: tom_tat,
        },
    }).then((result) => {});
};

export { RegisterUser };

const Getuserteachclass = function (id_user: number, callback: any) {
    axios({
        url: `http://localhost:4000/classlist`,
        method: "get",
        params: {
            id: id_user,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { Getuserteachclass };

const Getuserlearnclass = function (id_user: number, callback: any) {
    axios({
        url: `http://localhost:4000/learnlist`,
        method: "get",
        params: {
            id: id_user,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { Getuserlearnclass };

const Getuserbyid = function (id_user: number, callback: any) {
    axios({
        url: `http://localhost:4000/getuser`,
        method: "get",
        params: {
            id: id_user,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { Getuserbyid };

const EditUser = function (id_user: number, email: string, ten: string, tom_tat: string, callback: any) {
    axios({
        url: `http://localhost:4000/updateuser`,
        method: "get",
        params: {
            id: id_user,
            email: email,
            ten: ten,
            tom_tat: tom_tat,
        },
    }).then((result) => {});
};

export { EditUser };

const EditImg = function (ten_dang_nhap: string, filetoupload: any, callback: any) {
    axios({
        method: "post",
        url: "http//localhost:5000/uploadfile/" + ten_dang_nhap,
        data: filetoupload,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((result) => {
        callback(result);
    });
};

export { EditImg };
