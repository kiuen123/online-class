/* eslint-disable array-callback-return */
import { Formik, Form, Field } from "formik";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Getstudentlist, {
    deleteSchedule,
    getChecklist,
    GetClassById,
    GetClassStore,
    getCode,
    getSchedule,
    getTestbyClass,
    insertCode,
    Insertpost,
    insertSchedule,
    tangluotxem,
    updateLink,
} from "../../API/classAPI";
import Getallpost, { CarePost, delpost } from "../../API/postAPI";
import { AppContext } from "../../App";
import { TabSelector } from "../tabs/TabSelector";
import JoditEditor from "jodit-react";
let xlsx = require("json-as-xlsx");

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
                background-color: #657ef8;
            }
        }
        .active {
            color: #fff;
            background-color: #657ef8;
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
                        border-left: 1px solid #ccc;
                        border-right: 1px solid #ccc;
                        padding: 1rem;
                    }
                }
            }
            .act {
                display: flex;
                justify-content: center;
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
                    }
                }
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
        a,
        button {
            width: 100%;
            display: block;
            background-color: #fff;
            text-align: center;
            color: #000000;
            font-size: 16px;
            padding: 0.5rem;
            border-radius: 0.5rem;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
            :hover {
                color: #fff;
                background-color: #657ef8;
            }
            i {
                float: right;
            }
        }
        p {
            padding: 1rem;
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
                        text-align: center;
                        padding: 1rem;
                    }
                }
            }
        }
    }
    .thongkediem {
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
        }
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

function TeacherViewClass() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
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

    // lấy danh sách toàn bộ học sinh của lớp
    const [StudentList, setStudentList] = useState<any>([]);
    useEffect(() => {
        Getstudentlist(class_id, (data: any) => {
            setStudentList(data);
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
    const [selectedTab, setSelectedTab] = useTabs(["Lớp", "Kho lưu trữ", "Danh sách lớp", "Điểm danh", "Bài kiểm tra"]);

    // nôi dung của bài đang viết
    const [EditorContent, setEditorContent] = useState<any>();
    const editor = useRef<any>();
    const config = {
        readonly: false,
    };

    // thông tin file được chọn
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [status, setStatus] = useState("");
    const [filestore, setfilestore] = useState({ data: "" });
    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        };
        setfilestore(img);
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

    // lich hoc
    const [LichHoc, setLichHoc] = useState<any>([]);
    useEffect(() => {
        getSchedule(class_id, (data: any) => {
            setLichHoc(data);
        });
    }, [class_id]);

    const [show, setshow] = useState<string>("hide");
    const handleClose = () => {
        setshow("hide");
    };
    const handleShow = () => {
        setshow("show");
    };

    const [showbaiviet, setshowbaiviet] = useState<string>("hide");
    const handleClosebv = () => {
        setshowbaiviet("hide");
    };
    const handleShowbv = () => {
        setshowbaiviet("show");
    };

    const [showlink, setshowlink] = useState<string>("hide");
    const handleCloselink = () => {
        setshowlink("hide");
    };
    const handleShowlink = () => {
        setshowlink("show");
    };

    const [tongsosv, settongsosv] = useState<number>(0);
    useEffect(() => {
        settongsosv(StudentList.length);
    }, [StudentList]);

    const [datasv, setdatasv] = useState<any>([]);
    const [content, setcontent] = useState<any>([]);
    useEffect(() => {
        if (StudentList.length > 0) {
            setcontent(
                StudentList.map((item: any, i: any) => {
                    return {
                        STT: i + 1,
                        ten: item.ten,
                    };
                })
            );
        }
    }, [StudentList]);
    useEffect(() => {
        setdatasv([
            {
                sheet: class_id,
                columns: [
                    { label: "STT", value: "STT" },
                    { label: "Họ và tên", value: "ten" },
                ],
                content: content,
            },
        ]);
    }, [class_id, content]);

    const [tenlop, settenlop] = useState<string>("");
    const [settings, setSettings] = useState<any>({});
    useEffect(() => {
        if (ClassDetail.length > 0) {
            settenlop(ClassDetail[0].ten_lop);
        }
    }, [ClassDetail]);

    useEffect(() => {
        setSettings({
            fileName: "Danh sách lớp " + tenlop,
            extraLength: 3,
            writeOptions: {},
        });
    }, [tenlop]);

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
                                isActive={selectedTab === "Danh sách lớp"}
                                onClick={() => setSelectedTab("Danh sách lớp")}
                            >
                                Danh sách lớp
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
                                                    <button
                                                        className="addtime"
                                                        onClick={() => {
                                                            deleteSchedule(
                                                                class_id,
                                                                item.thu,
                                                                item.gio_bat_dau,
                                                                item.gio_ket_thuc,
                                                                (data: any) => {
                                                                    getSchedule(class_id, (data: any) => {
                                                                        setLichHoc(data);
                                                                    });
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        Xóa lịch học
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <button
                                            className="addtime"
                                            onClick={() => {
                                                handleShow();
                                            }}
                                        >
                                            Thêm lịch học
                                        </button>
                                        <button
                                            className={"addtime " + show}
                                            onClick={() => {
                                                handleClose();
                                            }}
                                        >
                                            Hủy thêm lịch
                                        </button>
                                        <Formik
                                            initialValues={{
                                                thu: "Thứ 2",
                                                gio_bat_dau: "06:30",
                                                gio_ket_thuc: "23:30",
                                            }}
                                            onSubmit={(values) => {
                                                insertSchedule(
                                                    class_id,
                                                    values.thu,
                                                    values.gio_bat_dau,
                                                    values.gio_ket_thuc,
                                                    (data: any) => {
                                                        getSchedule(class_id, (data: any) => {
                                                            setLichHoc(data);
                                                            handleClose();
                                                        });
                                                    }
                                                );
                                            }}
                                        >
                                            {({ values }) => (
                                                <Form className={"lichhoc " + show}>
                                                    <div>
                                                        <Field as="select" name="thu" id="thu">
                                                            <option value="Thứ 2">Thứ 2</option>
                                                            <option value="Thứ 3">Thứ 3</option>
                                                            <option value="Thứ 4">Thứ 4</option>
                                                            <option value="Thứ 5">Thứ 5</option>
                                                            <option value="Thứ 6">Thứ 6</option>
                                                            <option value="Thứ 7">Thứ 7</option>
                                                            <option value="Chủ nhật">Chủ nhật</option>
                                                        </Field>
                                                        <Field
                                                            type="time"
                                                            name="gio_bat_dau"
                                                            min={values.gio_bat_dau}
                                                        />
                                                        <Field
                                                            type="time"
                                                            name="gio_ket_thuc"
                                                            max={values.gio_ket_thuc}
                                                        />
                                                    </div>
                                                    <button className="sbm" type="submit">
                                                        Thêm lịch học
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                        <br />
                                        <button
                                            className="addtime"
                                            onClick={() => {
                                                window.open(classitem.link_online, "_blank");
                                            }}
                                        >
                                            Tới lớp online
                                        </button>
                                        <br />
                                        <button
                                            className="addtime"
                                            onClick={() => {
                                                handleShowlink();
                                            }}
                                        >
                                            Đổi link lớp học
                                        </button>
                                        <br />
                                        <button
                                            className={"addtime " + showlink}
                                            onClick={() => {
                                                handleCloselink();
                                            }}
                                        >
                                            Hủy đổi link lớp học
                                        </button>
                                        <Formik
                                            initialValues={{
                                                link: "",
                                            }}
                                            onSubmit={(values) => {
                                                updateLink(class_id, values.link, (data: any) => {
                                                    GetClassById(class_id, (data: any) => {
                                                        setClassDetail(data);
                                                        handleCloselink();
                                                    });
                                                });
                                            }}
                                        >
                                            {({ values }) => (
                                                <Form className={"lichhoc " + showlink}>
                                                    <div>
                                                        <Field name="link" placeholder="link lớp học" />
                                                    </div>
                                                    <button className="sbm" type="submit">
                                                        Sửa đường đẫn tới lớp online
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Fragment>
                                );
                            })}
                            <br />
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
                                    handleClosebv();
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
                                        <i className="date">{item.ngay_dang}</i>
                                    </div>
                                );
                            })}
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Kho lưu trữ"}>
                        <div className="store">
                            {ClassDetail.map((item: any) => {
                                return (
                                    <div key={item.id}>
                                        <form
                                            encType="multipart/form-data"
                                            onSubmit={async (e: any) => {
                                                e.preventDefault();
                                                let formData = new FormData();
                                                formData.append("file", filestore.data);
                                                const response = await fetch(
                                                    "http://localhost:5000/addstore/" +
                                                        item.id +
                                                        "/" +
                                                        item.ten_lop +
                                                        "/" +
                                                        selectedFile.name,
                                                    {
                                                        method: "POST",
                                                        body: formData,
                                                    }
                                                );
                                                if (response) {
                                                    setStatus(response.statusText);
                                                    GetClassStore(class_id, (data: any) => {
                                                        setstoreList(data);
                                                    });
                                                }
                                            }}
                                        >
                                            <input type="file" name="file" onChange={changeHandler} />
                                            {isFilePicked ? (
                                                <div>
                                                    <p>Tên file: {selectedFile.name}</p>
                                                    <p>Loại file: {selectedFile.type}</p>
                                                </div>
                                            ) : (
                                                <p>Chọn file để thấy thông tin</p>
                                            )}
                                            <button type="submit" onClick={() => {}}>
                                                Thêm tài liệu
                                            </button>
                                            {status && (
                                                <h4>
                                                    {status === "OK"
                                                        ? "Upload thành công"
                                                        : "Có lỗi xuất hiện xin hãy thử lại"}
                                                </h4>
                                            )}
                                        </form>
                                    </div>
                                );
                            })}
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

                    <TabPanel hidden={selectedTab !== "Danh sách lớp"}>
                        <div className="studentlist">
                            <div>
                                {ClassDetail.map((item: any) => {
                                    return (
                                        <Link className="giaovien" to={"/userinfo/" + item.giao_vien} key={item.id}>
                                            <img src={item.anh_dai_dien} alt="" />
                                            <p>Giáo viên: {item.ten}</p>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div>
                                <h2>Danh sách học sinh</h2>
                                <p>Tổng số sinh viên: {tongsosv}</p>
                                <button
                                    className="addtime"
                                    onClick={() => {
                                        xlsx(datasv, settings);
                                    }}
                                >
                                    Tải danh sách lớp
                                </button>
                                <br />
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ tên</th>
                                            <th>
                                                {currentdate.getDate() +
                                                    "-" +
                                                    (currentdate.getMonth() + 1) +
                                                    "-" +
                                                    currentdate.getFullYear()}
                                            </th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {StudentList.map((useritem: any, index: any) => {
                                            return (
                                                <tr key={useritem.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{useritem.ten}</td>
                                                    <td>
                                                        {DiemDanhList.map((item: any) => {
                                                            if (item.user === useritem.id) {
                                                                return <>x</>;
                                                            } else {
                                                                return <></>;
                                                            }
                                                        })}
                                                    </td>

                                                    <td className="act">
                                                        <Link to={"/userinfo/" + useritem.id}>Xem thông tin</Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Điểm danh"}>
                        <div className="diemdanh">
                            {DiemDanh.length === 0 ? (
                                <Fragment>
                                    {ClassDetail.map((item: any, index: any) => {
                                        return (
                                            <Formik
                                                key={index}
                                                initialValues={{
                                                    lop: class_id,
                                                    code: "",
                                                    ngay: currentdate.getDate(),
                                                    thang: currentdate.getMonth() + 1,
                                                    nam: currentdate.getFullYear(),
                                                    luot_diem_danh: 0,
                                                }}
                                                onSubmit={(values) => {
                                                    insertCode(
                                                        values.lop,
                                                        values.code,
                                                        values.ngay,
                                                        values.thang,
                                                        values.nam,
                                                        values.luot_diem_danh,
                                                        (data: any) => {
                                                            getCode(
                                                                class_id,
                                                                currentdate.getDate(),
                                                                currentdate.getMonth() + 1,
                                                                currentdate.getFullYear(),
                                                                (data: any) => {
                                                                    setDiemDanh(data);
                                                                }
                                                            );
                                                        }
                                                    );
                                                }}
                                            >
                                                {() => (
                                                    <Form>
                                                        <Field id="code" name="code" placeholder="Mã điểm danh" />
                                                        <button type="submit">Tạo mã điểm danh</button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        );
                                    })}
                                </Fragment>
                            ) : (
                                <>
                                    {ClassDetail.map((item: any, i: any) => {
                                        return item.giao_vien !== CurrentUser ? null : (
                                            <Fragment key={i}>
                                                {DiemDanh.map((item: any, index1: any) => {
                                                    return (
                                                        <Fragment key={index1}>
                                                            <h2>Mã điểm danh hôm nay: {item.code}</h2>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Họ tên</th>
                                                                        <th>Ngày giờ điểm danh</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {DiemDanhList.map((item: any, index2: any) => {
                                                                        return (
                                                                            <tr key={index2}>
                                                                                <td>{index1 + 1}</td>
                                                                                <td>{item.ten}</td>
                                                                                <td>{item.date}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </Fragment>
                                                    );
                                                })}
                                            </Fragment>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </TabPanel>

                    <TabPanel hidden={selectedTab !== "Bài kiểm tra"}>
                        <div className="test">
                            <h2>Danh sách bài kiểm tra</h2>
                            {ClassDetail.map((item: any) => {
                                return (
                                    <Link to={"/addtest/" + class_id}>
                                        <p>Thêm bài kiểm tra</p>
                                    </Link>
                                );
                            })}
                            {TestList.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên bài kiểm tra</th>
                                            <th>Ngày tạo</th>
                                            <th>Lượt làm bài</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TestList.map((item: any, index: any) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.ten_bai_kiem_tra}</td>
                                                    <td>{item.ngay_tao}</td>
                                                    <td>{item.luot_lam_bai}</td>
                                                    <td className="act">
                                                        <Link to={"/test/" + item.id}>Xem bài kiểm tra</Link>
                                                        <Link to={"/usertest/" + item.id}>
                                                            Xem danh sách làm bài kiểm tra
                                                        </Link>
                                                        <Link to={"/updatetest/" + item.id}>Sửa bài kiểm tra</Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Chưa có bài kiểm tra</p>
                            )}
                        </div>
                    </TabPanel>
                </div>
            </CLASS>
        </div>
    );
}

export default TeacherViewClass;
