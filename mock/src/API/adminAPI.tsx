import axios from "axios";

const Getallusercount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getallusercount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export default Getallusercount;

const Getalladmincount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getadmincount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { Getalladmincount };

const getStudentCount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getstudentcount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getStudentCount };

const getTeacherCount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getteachercount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getTeacherCount };

const getClassCount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getclasscount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getClassCount };

const getPostCount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getpostcount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getPostCount };

const getCmtCount = function (callback: any) {
    axios({
        url: `http://localhost:4000/getcmtcount`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getCmtCount };

const getAllUser = function (callback: any) {
    axios({
        url: `http://localhost:4000/alluser`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getAllUser };

const getAllClass = function (callback: any) {
    axios({
        url: `http://localhost:4000/getallclass`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getAllClass };

const getAlPost = function (callback: any) {
    axios({
        url: `http://localhost:4000/admingetallpost`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { getAlPost };

const AdmingetAllComment = function (callback: any) {
    axios({
        url: `http://localhost:4000/admingetallcomment`,
        method: "get",
    }).then((result) => {
        callback(result.data);
    });
};

export { AdmingetAllComment };
