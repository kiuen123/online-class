import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import { insertTest } from "../../API/classAPI";

const TEST = styled.div`
    background-color: #fff;
    min-height: 100vh;
    padding: 1rem;
    p {
        font-size: 1.2rem;
        padding: 0.5rem;
    }
    Form {
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        #ten_bai_viet,
        button,
        input {
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
    .cauhoi {
        border: 1px solid #ccc;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        width: 100%;
    }
    .error {
        color: red;
        background-color: #fff;
    }
    label {
        font-size: 1.2rem;
        padding: 0.5rem;
    }
`;

function validate(value: any) {
    let error;
    if (!value) {
        error = "Không được để trống tiêu đề -_-";
    } else if (value.length < 4) {
        error = "Tiêu đề quá ngắn";
    }
    return error;
}

function Addtest() {
    const class_id: any = useParams<any>().classid;
    var cauhoi: never[] = [];
    var [cauhoisave, setcauhoisave] = useState<any>();
    var [cauhoipreview, setCauhoipreview] = useState<any>([]);
    const Navigate = useNavigate();

    // thông tin file được chọn
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        readXlsxFile(event.target.files[0], { schema }).then((rows: any) => {
            cauhoi = rows.rows;
            setcauhoisave(JSON.stringify(cauhoi));
            setCauhoipreview(cauhoi);
        });
    };

    const schema = {
        cau_hoi: {
            prop: "cau_hoi",
            type: String,
        },
        a: {
            prop: "a",
            type: String,
        },
        b: {
            prop: "b",
            type: String,
        },
        c: {
            prop: "c",
            type: String,
        },
        d: {
            prop: "d",
            type: String,
        },
        dap_an_dung: {
            prop: "dap_an_dung",
            type: String,
        },
    };

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

    return (
        <TEST>
            <Formik
                initialValues={{
                    ten_bai_kiem_tra: "",
                    thoi_gian_lam_bai: 15,
                }}
                onSubmit={(values) => {
                    insertTest(
                        class_id,
                        values.ten_bai_kiem_tra,
                        cauhoisave,
                        datetime,
                        values.thoi_gian_lam_bai,
                        (res: any) => {
                            Navigate("/class/" + class_id);
                        }
                    );
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <button
                            onClick={() => {
                                window.open("/class/default/cau_hoi_mau.xlsx", "_blank");
                            }}
                        >
                            Câu hỏi mẫu
                        </button>
                        <label htmlFor="ten_bai_kiem_tra">Tên bài kiểm tra</label>
                        <Field name="ten_bai_kiem_tra" placeholder="Tên bài kiểm tra" validate={validate} />
                        {errors.ten_bai_kiem_tra && touched.ten_bai_kiem_tra && (
                            <p className="error">{errors.ten_bai_kiem_tra} </p>
                        )}
                        <label htmlFor="thoi_gian_lam_bai">
                            Thời gian làm bài (Tính theo phút, mặc định là 15 phút)
                        </label>
                        <Field
                            type="number"
                            name="thoi_gian_lam_bai"
                            placeholder="Thời gian làm bài (Tính theo phút, mặc định là 15 phút)"
                        />
                        <Field type="file" name="filetoupload" onChange={changeHandler} />
                        {isFilePicked ? (
                            <div>
                                <p>Tên file: {selectedFile.name}</p>
                                <p>Loại file: {selectedFile.type}</p>
                            </div>
                        ) : (
                            <p>Chọn file để thấy thông tin</p>
                        )}
                        <button type="submit">Thêm bài kiểm tra</button>
                    </Form>
                )}
            </Formik>
            <div className="preview">
                {cauhoipreview.map((item: any) => {
                    return (
                        <div key={item.cau_hoi} className="cauhoi">
                            <p>Câu hỏi: {item.cau_hoi}</p>
                            <p>Đáp án A: {item.a}</p>
                            <p>Đáp án B: {item.b}</p>
                            <p>Đáp án C: {item.c}</p>
                            <p>Đáp án D: {item.d}</p>
                            <p>Đáp án đúng: {item.dap_an_dung}</p>
                        </div>
                    );
                })}
            </div>
        </TEST>
    );
}
export default Addtest;
