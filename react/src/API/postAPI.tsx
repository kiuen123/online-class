import axios from "axios";

const Getallpost = function (class_id: number, callback: any) {
    axios({
        url: `http://localhost:4000/allpost`,
        method: "get",
        params: {
            id: class_id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export default Getallpost;

const delpost = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/delpost`,
        method: "get",
        params: {
            id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { delpost };

const GetPostDetail = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/postdetail`,
        method: "get",
        params: {
            id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { GetPostDetail };

const GetPostComment = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/allcomment`,
        method: "get",
        params: {
            post_id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { GetPostComment };

const AddPostComment = function (post_id: number, user_id: number, noi_dung: string, ngay_dang: string, callback: any) {
    axios({
        url: `http://localhost:4000/addcomment`,
        method: "get",
        params: {
            post_id: post_id,
            user_id: user_id,
            noi_dung: noi_dung,
            ngay_dang: ngay_dang,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { AddPostComment };

const DelPostComment = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/deletecomment`,
        method: "get",
        params: {
            cmt_id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { DelPostComment };

const deleteCommentbyPost = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/deletecommentbypost`,
        method: "get",
        params: {
            post_id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { deleteCommentbyPost };

const GetPostbyUser = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/userpost`,
        method: "get",
        params: {
            id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { GetPostbyUser };

const GetUserCarePost = function (id: number, callback: any) {
    axios({
        url: `http://localhost:4000/usercarepost`,
        method: "get",
        params: {
            id: id,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { GetUserCarePost };

const CarePost = function (uid: number, pid: number, callback: any) {
    axios({
        url: `http://localhost:4000/carepost`,
        method: "get",
        params: {
            user_id: uid,
            post_id: pid,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { CarePost };

const delCarePost = function (pid: number, callback: any) {
    axios({
        url: `http://localhost:4000/delcarepost`,
        method: "get",
        params: {
            id: pid,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { delCarePost };

const delCare = function (uid: number, pid: number, callback: any) {
    axios({
        url: `http://localhost:4000/delcare`,
        method: "get",
        params: {
            user_id: uid,
            post_id: pid,
        },
    }).then((res) => {
        callback(res.data);
    });
};

export { delCare };
