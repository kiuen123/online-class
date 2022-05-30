import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GetUserMail, GetUserName, RegisterUser } from "../../API/userAPI";

const REGISTER = styled.div`
    background-color: #fff;
    display: flex;
    height: 100vh;
    justify-content: center;
    position: relative;
    Form {
        margin: 1rem auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        width: 80%;
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
            color: #fff;
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
        .error {
            color: red;
            background-color: #fff;
        }
    }
`;

function Register() {
    const Navigate = useNavigate();

    // kiểm tra user đã tồn tại chưa
    const [ListAcc, setListAcc] = useState<any>([]);
    useEffect(() => {
        GetUserName((data: any) => {
            setListAcc(data);
        });
    }, []);
    const checkaccuser = (value: any) => {
        let error;
        for (let i = 0; i < ListAcc.length; i++) {
            if (value === ListAcc[i].ten_dang_nhap) {
                error = "Tài khoản đã tồn tại";
            }
        }
        if (!value) {
            error = "Không được để trống ô này -_-";
        } else if (!/[A-Z0-9._%+-]$/i.test(value)) {
            error = "Thông tin không hợp lệ";
        } else if (value.length < 4) {
            error = "Thông tin phải có ít nhất 4 kí tự";
        }
        return error;
    };

    // kiểm tra email đã dc sử dụng chưa
    const [ListMail, setListMail] = useState<any>([]);
    useEffect(() => {
        GetUserMail((data: any) => {
            setListMail(data);
        });
    }, []);
    const checkmailuser = (value: any) => {
        let error;
        for (let i = 0; i < ListMail.length; i++) {
            if (value === ListMail[i].email) {
                error = "Email đã được sử dụng";
            }
        }
        if (!value) {
            error = "Không được để trống ô này -_-";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = "Thông tin không hợp lệ";
        }
        return error;
    };

    // kiểm tra các thông tinn còn lại
    const validate = (value: any) => {
        let error;
        if (!value) {
            error = "Không được để trống ô này -_-";
        } else if (!/[A-Z0-9._%+-]$/i.test(value)) {
            error = "Thông tin không hợp lệ";
        } else if (value.length < 4) {
            error = "Thông tin phải có ít nhất 4 kí tự";
        }
        return error;
    };

    return (
        <REGISTER>
            <Formik
                initialValues={{
                    ten_dang_nhap: ``,
                    mat_khau: ``,
                    picked: "2",
                    email: ``,
                    ten: ``,
                    tom_tat: ``,
                    re_mat_khau: ``,
                }}
                onSubmit={(values) => {
                    if (values.mat_khau === values.re_mat_khau) {
                        RegisterUser(
                            values.ten_dang_nhap,
                            values.mat_khau,
                            values.email,
                            values.ten,
                            values.picked,
                            values.tom_tat,
                            (data: any) => {}
                        );
                        Navigate("/");
                    } else {
                        alert("Mật khẩu không trùng khớp");
                    }
                }}
            >
                {({ errors, touched, isValidating }) => (
                    <Form encType="multipart/form-data">
                        <Field
                            id="ten_dang_nhap"
                            name="ten_dang_nhap"
                            placeholder="Tên đăng nhập"
                            validate={checkaccuser}
                        />
                        {errors.ten_dang_nhap && touched.ten_dang_nhap && (
                            <p className="error">{errors.ten_dang_nhap}</p>
                        )}
                        <Field
                            id="mat_khau"
                            name="mat_khau"
                            placeholder="Mật khẩu"
                            type="password"
                            validate={validate}
                        />
                        {errors.mat_khau && touched.mat_khau && <p className="error">{errors.mat_khau} </p>}
                        <Field
                            id="re_mat_khau"
                            name="re_mat_khau"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            validate={validate}
                        />
                        {errors.re_mat_khau && touched.re_mat_khau && <p className="error">{errors.re_mat_khau}</p>}
                        <Field id="email" name="email" placeholder="Email" validate={checkmailuser} />
                        {errors.email && touched.email && <p className="error">{errors.email}</p>}
                        <Field id="ten" name="ten" placeholder="Họ và tên" validate={validate} />
                        {errors.ten && touched.ten && <p className="error">{errors.ten}</p>}
                        <div role="group" aria-labelledby="my-radio-group">
                            <label>
                                <Field type="radio" name="picked" value="2" />
                                <p>học sinh/sinh viên</p>
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="3" />
                                <p>giáo viên/giảng viên</p>
                            </label>
                        </div>
                        <Field id="tom_tat" name="tom_tat" placeholder="Tóm tắt" />
                        <button type="submit">Đăng kí</button>
                        <Link to="/login">Đăng nhập</Link>
                    </Form>
                )}
            </Formik>
        </REGISTER>
    );
}

export default Register;
