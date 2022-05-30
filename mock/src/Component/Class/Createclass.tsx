import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CreateClass } from "../../API/classAPI";
import { AppContext } from "../../App";

const REGISTER = styled.div`
    background-color: #fff;
    display: flex;
    min-height: 100vh;
    justify-content: center;
    Form {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        width: 80%;
        label {
            margin-bottom: 1rem;
        }
        input,
        button {
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
`;

function validate(value: any) {
    let error;
    if (!value) {
        error = "Không được để trống ô này -_-";
    } else if (value.length < 4) {
        error = "Thông tin phải có ít nhất 4 kí tự";
    }
    return error;
}
function Createclass() {
    const contextValue = useContext(AppContext);
    const Navigate = useNavigate();
    var Info: any = contextValue[0].CurrentUser;

    var currentdate = new Date();

    return (
        <REGISTER>
            <Formik
                initialValues={{
                    ten_lop: ``,
                    giao_vien: Info,
                    ngay_bat_dau:
                        currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getDate(),
                    ngay_ket_thuc:
                        currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getDate(),
                    thoi_gian_bat_dau: "06:30",
                    thoi_gian_ket_thuc: "23:30",
                    link_online: ``,
                }}
                onSubmit={(values) => {
                    CreateClass(
                        values.ten_lop,
                        values.giao_vien,
                        values.ngay_bat_dau.split("-")[2] +
                            "/" +
                            values.ngay_bat_dau.split("-")[1] +
                            "/" +
                            values.ngay_bat_dau.split("-")[0],
                        values.ngay_ket_thuc.split("-")[2] +
                            "/" +
                            values.ngay_ket_thuc.split("-")[1] +
                            "/" +
                            values.ngay_ket_thuc.split("-")[0],
                        values.link_online,
                        (data: any) => {}
                    );
                    Navigate("/");
                    window.location.reload();
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Field id="ten_lop" name="ten_lop" placeholder="Tên lớp" validate={validate} />
                        {errors.ten_lop && touched.ten_lop && <p className="error">{errors.ten_lop} </p>}
                        <label htmlFor="ngay_bat_dau">Ngày bắt đầu khóa học</label>
                        <Field
                            type="date"
                            id="ngay_bat_dau"
                            name="ngay_bat_dau"
                            min={
                                currentdate.getFullYear() +
                                "-" +
                                (currentdate.getMonth() + 1) +
                                "-" +
                                currentdate.getDate()
                            }
                        />
                        <label htmlFor="ngay_ket_thuc">Ngày kết thúc khóa học</label>
                        <Field
                            type="date"
                            id="ngay_ket_thuc"
                            name="ngay_ket_thuc"
                            min={
                                currentdate.getFullYear() +
                                "-" +
                                (currentdate.getMonth() + 1) +
                                "-" +
                                currentdate.getDate()
                            }
                        />
                        <label htmlFor="link_online">Link lớp học</label>
                        <Field type="link_online" id="link_online" name="link_online" placeholder="http://" />
                        <button type="submit">Tạo lớp</button>
                    </Form>
                )}
            </Formik>
        </REGISTER>
    );
}

export default Createclass;
