import { Formik, Form, Field } from "formik";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
    deleteStudentByClass,
    getChecklist,
    GetClassById,
    GetClassStore,
    getCode,
    getSchedule,
    getTestbyClass,
    Insertpost,
    luudiemdanh,
    tangluotdiemdanh,
    tangluotxem,
} from "../../API/classAPI";
import Getallpost, { CarePost, delpost } from "../../API/postAPI";
import { AppContext } from "../../App";
import { TabSelector } from "../tabs/TabSelector";
import JoditEditor from "jodit-react";
const CLASS = styled.div`
    background-color: #fff;
    min-height: 100vh;
    position: relative;
    width: 100%;
    .tabbar {
        z-index: 1;
        position: -webkit-sticky;
        position: sticky;
        top: 76px;
        display: flex;
        width: 100%;
        border-bottom: 5px solid #f1f4f9;
        * {
            font-size: 1rem;
            background-color: #fff;
            width: 100%;
            padding: 1rem;
            border-radius: 0.5rem;
            border: none;
            :hover {
                color: #fff;
                font-weight: bold;
                background-color: #657ef8;
            }
        }
        .active {
            color: #fff;
            font-weight: bold;
            background-color: #657ef8;
        }
    }
    .postlist {
        padding: 1rem;
        margin-right: 1rem;
        .post {
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            overflow: hidden;
            h2 {
                text-align: center;
                font-size: 24px;
            }
            .post-content {
                padding: 0 1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            button,
            a {
                display: inline-block;
                text-decoration: none;
                background-color: #fff;
                color: #000000;
                font-size: 16px;
                padding: 0.5rem;
                border-radius: 0.5rem;
                background-color: #f1f4f9;
                text-decoration: none;
                border: none;
                :hover {
                    color: #fff;
                    font-weight: bold;
                    background-color: #657ef8;
                }
                width: 15%;
                text-align: center;
            }
            * {
                font-size: 16px;
                margin: 1rem 0;
            }
            .date {
                float: right;
            }
        }
    }
    .studentlist {
        padding: 1rem;
        background-color: #fff;
        .thongtin {
            text-decoration: none;
            display: flex;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            img {
                width: 100px;
                height: 100px;
                margin-right: 1rem;
            }
        }
        .giaovien {
            text-decoration: none;
            display: flex;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            img {
                width: 100px;
                height: 100px;
                margin-right: 1rem;
            }
            :hover {
                color: #fff;
                background-color: #657ef8;
                font-weight: bold;
            }
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            thead {
                font-weight: bold;
                text-transform: uppercase;
                color: #fff;
                background-color: #00a8ff;
                tr {
                    th {
                        padding: 1rem;
                    }
                }
            }
            tbody {
                tr {
                    :nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    :nth-child(odd) {
                        background-color: #fff;
                    }
                    td {
                        padding: 1rem;
                    }
                }
            }
            .act {
                display: flex;
                flex-direction: column;
                button,
                a {
                    background-color: #00a8ff;
                    color: #000;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: none;
                    margin-bottom: 0.5rem;
                    text-decoration: none;
                    text-align: center;
                    font-size: 1rem;
                    :hover {
                        background-color: #fff;
                        color: #00a8ff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    Form {
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        #ten_bai_viet,
        .sbm {
            font-size: 16px;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            width: 100%;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
        }
        .sbm {
            background-color: #657ef8;
            color: #000000;
            :hover {
                color: #fff;
                font-weight: bold;
            }
        }
    }
    .tenlop {
        margin-bottom: 1rem;
        h2 {
            text-align: center;
        }
    }
    .error {
        color: red;
        background-color: #fff;
    }
    .link {
        margin-top: 1rem;
        width: 100%;
        button {
            display: block;
            background-color: #fff;
            color: #000000;
            font-size: 16px;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
            :hover {
                color: #fff;
                font-weight: bold;
                background-color: #657ef8;
            }
        }
        i {
            float: right;
        }
    }
    .store {
        padding: 1rem;
        Form {
            display: flex;
            flex-direction: column;
            border-radius: 0.5rem;
            #ten_bai_viet,
            * {
                font-size: 16px;
                padding: 0.5rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
                width: 100%;
                background-color: #f1f4f9;
                text-decoration: none;
                border: none;
            }
            button {
                background-color: #657ef8;
                color: #000000;
                :hover {
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
    }
    .diemdanh {
        padding: 1rem;
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            thead {
                font-weight: bold;
                text-transform: uppercase;
                color: #fff;
                background-color: #00a8ff;
                tr {
                    th {
                        padding: 1rem;
                    }
                }
            }
            tbody {
                tr {
                    :nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    :nth-child(odd) {
                        background-color: #fff;
                    }
                    td {
                        padding: 1rem;
                    }
                }
            }
        }

        Form {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            border-radius: 0.5rem;
            * {
                font-size: 16px;
                padding: 0.5rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
                width: 100%;
                background-color: #f1f4f9;
                text-decoration: none;
                border: none;
            }
            button {
                background-color: #657ef8;
                color: #000000;
                :hover {
                    color: #fff;
                    font-weight: bold;
                }
            }
            a {
                background-color: #fff;
                text-align: center;
                :hover {
                    background-color: #657ef8;
                    color: #fff;
                    font-weight: bold;
                }
            }
            div {
                display: flex;
                label {
                    display: flex;
                    align-items: baseline;
                    input {
                        width: 10%;
                    }
                }
            }
            .img {
                background-color: #fff;
                width: 100%;
                .imgshow {
                    background-color: #fff;
                }
            }
        }
        .error {
            color: red;
            background-color: #fff;
        }
    }
    .test {
        padding: 1rem;
        h2 {
            text-align: center;
            margin-bottom: 1rem;
        }
        a {
            width: 100%;
            display: block;
            background-color: #fff;
            color: #000000;
            font-size: 16px;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
            :hover {
                color: #fff;
                font-weight: bold;
                background-color: #657ef8;
            }
            i {
                float: right;
            }
        }
        p {
            padding: 1rem;
        }
    }
    .thongkediem {
        padding: 1rem;
        h2 {
            text-align: center;
            margin-bottom: 1rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            thead {
                font-weight: bold;
                text-transform: uppercase;
                color: #fff;
                background-color: #00a8ff;
                tr {
                    th {
                        padding: 1rem;
                    }
                }
            }
            tbody {
                tr {
                    :nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    :nth-child(odd) {
                        background-color: #fff;
                    }
                    td {
                        padding: 1rem;
                    }
                }
            }
        }
    }
    .option {
        padding: 1rem;
        button {
            width: 100%;
            display: block;
            background-color: #fff;
            color: #000000;
            font-size: 16px;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
            :hover {
                color: #fff;
                font-weight: bold;
                background-color: #657ef8;
            }
        }
    }
    .tgh {
        margin-bottom: 1rem;
    }
    .lich {
        display: flex;
        * {
            font-size: 16px;
            margin-right: 1rem;
            margin-bottom: 1rem;
        }
    }
    .thoikhoabieu {
        width: 100%;
        padding: 1rem;
    }
    .lichhoc {
        width: 500px;
        margin: 0 auto;
        div {
            display: flex;
            input {
                font-size: 1rem;
                background-color: #fff;
                width: 100%;
                padding: 1rem;
                border-radius: 0.5rem;
                border: none;
            }
        }
    }
    .addtime {
        font-size: 16px;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        width: 15%;
        background-color: #f1f4f9;
        text-decoration: none;
        border: none;
        color: #000000;
        :hover {
            background-color: #657ef8;
            color: #fff;
            font-weight: bold;
        }
    }
    .show {
        display: block;
    }
    .hide {
        display: none;
    }
`;

function validate(value: any) {
    let error;
    if (!value) {
        error = "Không được để trống tiêu đề -_-";
    } else if (value.length < 4) {
        error = "Thông tin phải có ít nhất 4 kí tự";
    }
    return error;
}

function StudentViewClass() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
    const Navigate = useNavigate();
    const class_id: any = useParams<any>().id;

    // lấy thông tin lớp
    const [ClassDetail, setClassDetail] = useState<any>([]);
    useEffect(() => {
        GetClassById(class_id, (data: any) => {
            setClassDetail(data);
        });
    }, [class_id]);

    // lấy danh sách toàn bộ bài viết của lớp
    const [AllPost, setAllPost] = useState<any>([]);
    useEffect(() => {
        Getallpost(class_id, (data: any) => {
            setAllPost(data);
        });
    }, [class_id]);

    // lấy danh sách các tài liệu của lớp
    const [storeList, setstoreList] = useState<any>([]);
    useEffect(() => {
        GetClassStore(class_id, (data: any) => {
            setstoreList(data);
        });
    }, [class_id]);

    // các tab
    const [selectedTab, setSelectedTab] = useTabs(["Lớp", "Kho lưu trữ", "Điểm danh", "Bài kiểm tra", "Tùy chọn"]);

    // nôi dung của bài đang viết
    const [EditorContent, setEditorContent] = useState<any>();
    const editor = useRef<any>();
    const config = {
        readonly: false,
    };

    // các bài kiểm tra
    const [TestList, setTestList] = useState<any>([]);
    useEffect(() => {
        getTestbyClass(class_id, (data: any) => {
            setTestList(data);
        });
    }, [class_id]);

    // ngày giờ
    var currentdate = new Date();
    var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " - " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    let i = 0;

    // lay ma diem danh
    const [DiemDanh, setDiemDanh] = useState<any>([]);
    useEffect(() => {
        getCode(class_id, currentdate.getDate(), currentdate.getMonth() + 1, currentdate.getFullYear(), (data: any) => {
            setDiemDanh(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [class_id]);

    // danh sach diem danh
    const [Checked, setChecked] = useState(false);
    const [DiemDanhList, setDiemDanhList] = useState<any>([]);
    useEffect(() => {
        getChecklist(
            class_id,
            currentdate.getDate(),
            currentdate.getMonth() + 1,
            currentdate.getFullYear(),
            (data: any) => {
                setDiemDanhList(data);
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [class_id]);

    useEffect(() => {
        if (DiemDanhList.length > 0) {
            for (let i = 0; i < DiemDanhList.length; i++) {
                if (DiemDanhList[i].user === CurrentUser) {
                    setChecked(true);
                }
            }
        }
    }, [CurrentUser, DiemDanhList]);

    // lich hoc
    const [LichHoc, setLichHoc] = useState<any>([]);
    useEffect(() => {
        getSchedule(class_id, (data: any) => {
            setLichHoc(data);
        });
    }, [class_id]);

    const [showbaiviet, setshowbaiviet] = useState<string>("hide");
    const handleClosebv = () => {
        setshowbaiviet("hide");
    };
    const handleShowbv = () => {
        setshowbaiviet("show");
    };

    return (
        <div>
            <CLASS>
                {ClassDetail.map((item: any) => {
                    return (
                        <nav className="tabbar" key={item.id}>
                            <TabSelector isActive={selectedTab === "Lớp"} onClick={() => setSelectedTab("Lớp")}>
                                Lớp: {item.ten_lop}
                            </TabSelector>

                            <TabSelector
                                isActive={selectedTab === "Kho lưu trữ"}
                                onClick={() => setSelectedTab("Kho lưu trữ")}
                            >
                                Kho lưu trữ
                            </TabSelector>

                            <TabSelector
                                isActive={selectedTab === "Điểm danh"}
                                onClick={() => setSelectedTab("Điểm danh")}
                            >
                                Điểm danh
                            </TabSelector>

                            <TabSelector
                                isActive={selectedTab === "Bài kiểm tra"}
                                onClick={() => setSelectedTab("Bài kiểm tra")}
                            >
                                Bài kiểm tra
                            </TabSelector>

                            <TabSelector
                                isActive={selectedTab === "Tùy chọn"}
                                onClick={() => setSelectedTab("Tùy chọn")}
                            >
                                Tùy chọn
                            </TabSelector>
                        </nav>
                    );
                })}

                <div className="">
                    <TabPanel hidden={selectedTab !== "Lớp"}>
                        <div className="thoikhoabieu">
                            {ClassDetail.map((classitem: any, index: any) => {
                                return (
                                    <Fragment key={index}>
                                        <p className="tgh">
                                            <b>Thời gian học :</b> {classitem.ngay_bat_dau} - {classitem.ngay_ket_thuc}
                                        </p>
                                        {LichHoc.map((item: any, index: any) => {
                                            return (
                                                <div className="lich" key={index}>
                                                    <p>
                                                        {item.thu} : {item.gio_bat_dau} - {item.gio_ket_thuc}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                        <button
                                            className="addtime"
                                            onClick={() => {
                                                window.open(classitem.link_online, "_blank");
                                            }}
                                        >
                                            Lớp online
                                        </button>
                                    </Fragment>
                                );
                            })}
                        </div>

                        <div className="postlist">
                            <button
                                className="addtime"
                                onClick={() => {
                                    handleShowbv();
                                }}
                            >
                                Thêm bài viết
                            </button>
                            <br />
                            <button
                                className={"addtime " + showbaiviet}
                                onClick={() => {
                                    handleClosebv();
                                }}
                            >
                                Hủy thêm bài viết
                            </button>
                            <Formik
                                initialValues={{
                                    ten_bai_viet: ``,
                                    ngay_dang: datetime,
                                }}
                                onSubmit={(values) => {
                                    Insertpost(
                                        CurrentUser,
                                        class_id,
                                        values.ten_bai_viet,
                                        EditorContent,
                                        values.ngay_dang,
                                        (data: any) => {}
                                    );
                                    Getallpost(class_id, (data: any) => {
                                        setAllPost(data);
                                    });
                                    values.ten_bai_viet = ``;
                                    setEditorContent(``);
                                }}
                            >
                                {({ errors, touched, values }) => (
                                    <Form className={" " + showbaiviet}>
                                        <Field
                                            id="ten_bai_viet"
                                            name="ten_bai_viet"
                                            placeholder="Tên bài viết"
                                            validate={validate}
                                        />
                                        {errors.ten_bai_viet && touched.ten_bai_viet && (
                                            <p className="error">{errors.ten_bai_viet} </p>
                                        )}
                                        <JoditEditor
                                            ref={editor}
                                            value={EditorContent}
                                            config={config}
                                            onBlur={(newContent) => setEditorContent(newContent)}
                                        />
                                        <button className="sbm" type="submit">
                                            Đăng bài
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            {AllPost.map((item: any) => {
                                return (
                                    <div key={item.id} className="post">
                                        <h2>{`${item.ten_bai_viet}`}</h2>
                                        <hr />
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: item.noi_dung.replace(/(<? *script)/gi, "illegalscript"),
                                            }}
                                            className="post-content"
                                        ></div>
                                        <Link to={"/post/" + item.id}>Xem chi tiết</Link>
                                        <button onClick={() => CarePost(CurrentUser, item.id, (data: any) => {})}>
                                            Quan tâm
                                        </button>
                                        {item.nguoi_viet === CurrentUser ? (
                                            <button
                                                onClick={() => {
                                                    // delCarePost(item.id, (data: any) => {});
                                                    delpost(item.id, (data: any) => {});
                                                    Getallpost(class_id, (data: any) => {
                                                        setAllPost(data);
                                                    });
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        ) : (
                                            <></>
                                        )}
                                        <i className="date">{item.ngay_dang}</i>
                                    </div>
                                );
                            })}
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Kho lưu trữ"}>
                        <div className="store">
                            {storeList.map((item: any) => {
                                i++;
                                return (
                                    <div key={i} className="link">
                                        <button
                                            onClick={() => {
                                                window.open(item.link, "_blank");
                                                tangluotxem(item.link, (data: any) => {});
                                                GetClassStore(class_id, (data: any) => {
                                                    setstoreList(data);
                                                });
                                            }}
                                        >
                                            {item.link}
                                        </button>
                                        <i>Lượt xem: {item.luot_xem}</i>
                                        <br />
                                        <i>Ngày đăng: {item.ngay_dang}</i>
                                    </div>
                                );
                            })}
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Điểm danh"}>
                        <div className="diemdanh">
                            {ClassDetail.map((item: any) => {
                                return Checked === true ? (
                                    <h2>hôm nay bạn đa điểm danh rồi</h2>
                                ) : (
                                    <>
                                        {DiemDanh.length > 0 ? (
                                            DiemDanh.map((item: any) => {
                                                return (
                                                    <Formik
                                                        initialValues={{
                                                            id: item.id,
                                                            user: CurrentUser,
                                                            code: "",
                                                        }}
                                                        onSubmit={(values) => {
                                                            if (values.code === item.code) {
                                                                tangluotdiemdanh(values.id, (data: any) => {
                                                                    luudiemdanh(
                                                                        values.id,
                                                                        values.user,
                                                                        datetime,
                                                                        (data: any) => {
                                                                            alert("Điểm danh thành công");
                                                                            getChecklist(
                                                                                class_id,
                                                                                currentdate.getDate(),
                                                                                currentdate.getMonth() + 1,
                                                                                currentdate.getFullYear(),
                                                                                (data: any) => {
                                                                                    setDiemDanhList(data);
                                                                                    if (DiemDanhList.length > 0) {
                                                                                        for (
                                                                                            let i = 0;
                                                                                            i < DiemDanhList.length;
                                                                                            i++
                                                                                        ) {
                                                                                            if (
                                                                                                DiemDanhList[i].user ===
                                                                                                CurrentUser
                                                                                            ) {
                                                                                                setChecked(true);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            );
                                                                        }
                                                                    );
                                                                });
                                                            } else {
                                                                alert("Mã điểm danh không đúng");
                                                            }
                                                        }}
                                                    >
                                                        {() => (
                                                            <Form>
                                                                <Field
                                                                    id="code"
                                                                    name="code"
                                                                    placeholder="Mã điểm danh"
                                                                />
                                                                <button type="submit">Điểm danh</button>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                );
                                            })
                                        ) : (
                                            <h2>Hôm nay chưa có mã điểm danh</h2>
                                        )}
                                    </>
                                );
                            })}
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Bài kiểm tra"}>
                        <div className="test">
                            <h2>Danh sách bài kiểm tra</h2>
                            {TestList.length > 0 ? (
                                <>
                                    {TestList.map((item: any) => {
                                        return (
                                            <Link to={"/test/" + item.id} key={item.id}>
                                                <p>{item.ten_bai_kiem_tra}</p>
                                                <i>{item.ngay_tao}</i>
                                            </Link>
                                        );
                                    })}
                                </>
                            ) : (
                                <p>Chưa có bài kiểm tra</p>
                            )}
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Tùy chọn"}>
                        <div className="option">
                            <h2>Tùy chọn</h2>
                            {ClassDetail.map((item: any) => {
                                return (
                                    <button
                                        onClick={() => {
                                            deleteStudentByClass(CurrentUser, class_id, (data: any) => {
                                                Navigate("/");
                                                window.location.reload();
                                            });
                                        }}
                                    >
                                        Rời khỏi lớp
                                    </button>
                                );
                            })}
                        </div>
                    </TabPanel>
                </div>
            </CLASS>
        </div>
    );
}

export default StudentViewClass;
