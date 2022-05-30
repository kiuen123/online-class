import axios from "axios";

const Getstudentlist = function (class_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/studentlist`,
        method: "get",
        params: {
            id: class_id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export default Getstudentlist;

const Insertpost = function (
    user_id: number,
    class_id: number,
    title: string,
    content: string,
    date_time: string,
    callback: any
) {
    axios({
        url: `http://localhost:4000/insertpost`,
        method: "get",
        params: {
            user_id: user_id,
            class_id: class_id,
            ten_bai_viet: title,
            noi_dung: content,
            ngay_dang: date_time,
        },
    }).then((result) => {});
};

export { Insertpost };

const CreateClass = function (
    class_name: string,
    user_id: number,
    ngay_bat_dau: string,
    ngay_ket_thuc: string,
    link_online: string,
    callback: any
) {
    axios({
        url: `http://localhost:4000/createclass`,
        method: "get",
        params: {
            ten_lop: class_name,
            giao_vien: user_id,
            ngay_bat_dau: ngay_bat_dau,
            ngay_ket_thuc: ngay_ket_thuc,
            link_online: link_online,
        },
    }).then((result) => {});
};

export { CreateClass };

const JoinClass = function (class_id: number, user_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/joinclass`,
        method: "get",
        params: {
            class_id: class_id,
            id: user_id,
        },
    }).then((result) => {});
};

export { JoinClass };

const GetClassByName = function (class_name: string, callback: any) {
    axios({
        url: `http://localhost:4000/classname`,
        method: "get",
        params: {
            ten_lop: class_name,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { GetClassByName };

const GetClassById = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/getclassbyid`,
        method: "get",
        params: {
            id: id,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { GetClassById };

const GetClassStore = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/getliststore/` + id,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { GetClassStore };

const addClassStore = function (id: number, ten_lop: string, filetoupload: any, callback: any) {
    const formData = new FormData();
    formData.append("filetoupload", filetoupload);
    axios({
        url: `http://localhost:5000/addstore/` + id + "/" + ten_lop,
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { addClassStore };

const tangluotxem = function (link: string, callback: any) {
    axios({
        url: `http://localhost:4000/tangluotxem`,
        method: "get",
        params: {
            link: link,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { tangluotxem };

const getTestbyClass = function (class_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/alltest`,
        method: "get",
        params: {
            class_id: class_id,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { getTestbyClass };

const insertCode = function (
    class_id: number,
    code: string,
    ngay: any,
    thang: any,
    nam: any,
    luot_diem_danh: number,
    callback: any
) {
    axios({
        url: `http://localhost:4000/addcheckin`,
        method: "get",
        params: {
            class_id: class_id,
            code: code,
            ngay: ngay,
            thang: thang,
            nam: nam,
            luot_diem_danh: luot_diem_danh,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { insertCode };

const getCode = function (class_id: number, ngay: any, thang: any, nam: any, callback: any) {
    axios({
        url: `http://localhost:4000/getcheckin`,
        method: "get",
        params: {
            class_id: class_id,
            ngay: ngay,
            thang: thang,
            nam: nam,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { getCode };

const tangluotdiemdanh = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/updatecheckin`,
        method: "get",
        params: { id: id },
    }).then((result) => {
        callback(result.data);
    });
};

export { tangluotdiemdanh };

const luudiemdanh = function (id: number, user: number, date: any, callback: any) {
    axios({
        url: `http://localhost:4000/insertcheckin`,
        method: "get",
        params: {
            id: id,
            user: user,
            date: date,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { luudiemdanh };

const getChecklist = function (class_id: number, ngay: any, thang: any, nam: any, callback: any) {
    axios({
        url: `http://localhost:4000/getcheckinlist`,
        method: "get",
        params: {
            class_id: class_id,
            ngay: ngay,
            thang: thang,
            nam: nam,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { getChecklist };

const insertTest = function (
    class_id: number,
    ten_bai_kiem_tra: any,
    noi_dung: any,
    ngay_tao: any,
    thoi_gian_lam_bai: any,
    callback: any
) {
    axios({
        url: `http://localhost:4000/inserttest`,
        method: "get",
        params: {
            class_id: class_id,
            ten_bai_kiem_tra: ten_bai_kiem_tra,
            noi_dung: noi_dung,
            ngay_tao: ngay_tao,
            thoi_gian_lam_bai: thoi_gian_lam_bai,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { insertTest };

const getTest = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/gettest`,
        method: "get",
        params: {
            id: id,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { getTest };

const tangluotlambai = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/updatetest`,
        method: "get",
        params: {
            id: id,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { tangluotlambai };

const luuketqua = function (id: number, user: any, ket_qua: number, ngay_lam: string, callback: any) {
    axios({
        url: `http://localhost:4000/inserttestresult`,
        method: "get",
        params: {
            id: id,
            user: user,
            ket_qua: ket_qua,
            ngay_lam: ngay_lam,
        },
    }).then((result) => {
        callback(result.data);
    });
};

export { luuketqua };

const getTestresult = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/gettestresult`,
        method: "get",
        params: {
            id: id,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { getTestresult };

const deleteStudentByClass = function (id: number, class_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/deletestudent`,
        method: "get",
        params: {
            id: id,
            class_id: class_id,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { deleteStudentByClass };

const getSchedule = function (class_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/getSchedule`,
        method: "get",
        params: {
            class_id: class_id,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { getSchedule };

const insertSchedule = function (
    class_id: number,
    thu: string,
    gio_bat_dau: string,
    gio_ket_thuc: string,
    callback: any
) {
    axios({
        url: `http://localhost:4000/insertSchedule`,
        method: "get",
        params: {
            class_id: class_id,
            thu: thu,
            gio_bat_dau: gio_bat_dau,
            gio_ket_thuc: gio_ket_thuc,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { insertSchedule };

const deleteSchedule = function (
    class_id: number,
    thu: string,
    gio_bat_dau: string,
    gio_ket_thuc: string,
    callback: any
) {
    axios({
        url: `http://localhost:4000/deleteSchedule`,
        method: "get",
        params: {
            id: class_id,
            thu: thu,
            gio_bat_dau: gio_bat_dau,
            gio_ket_thuc: gio_ket_thuc,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { deleteSchedule };

const updateLink = function (class_id: number, link: string, callback: any) {
    axios({
        url: `http://localhost:4000/updateLink`,
        method: "get",
        params: {
            id: class_id,
            link: link,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { updateLink };

const getcheckpointByClass = function (class_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/getcheckpointByClass`,
        method: "get",
        params: {
            class_id: class_id,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { getcheckpointByClass };

const getchecklistById = function (id: number, user: number, callback: any) {
    axios({
        url: `http://localhost:4000/getchecklistById`,
        method: "get",
        params: {
            id: id,
            user: user,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { getchecklistById };

const getTestById = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/getTestById`,
        method: "get",
        params: {
            id: id,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { getTestById };

const updateTestbyid = function (
    id: number,
    ten_bai_kiem_tra: any,
    noi_dung: any,
    thoi_gian_lam_bai: any,
    callback: any
) {
    axios({
        url: `http://localhost:4000/updateTestbyid`,
        method: "get",
        params: {
            id: id,
            ten_bai_kiem_tra: ten_bai_kiem_tra,
            noi_dung: noi_dung,
            thoi_gian_lam_bai: thoi_gian_lam_bai,
        },
    }).then((result) => {
        callback(result.data);
    });
};
export { updateTestbyid };
