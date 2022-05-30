import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Checklogin from "../../API/userAPI";
import { AppContext } from "../../App";

const LOGIN = styled.div`
    background-color: #fff;
    height: 100vh;
    position: relative;
    Form {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        width: 30rem;
        * {
            font-size: 16px;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            width: 100%;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
            outline: none;
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

function Login() {
    const contextValue = useContext(AppContext);
    const Navigate = useNavigate();
    let checkuser: any = "";
    return (
        <LOGIN>
            <Formik
                initialValues={{
                    ten_dang_nhap: ``,
                    mat_khau: ``,
                }}
                onSubmit={(values) => {
                    Checklogin(values.ten_dang_nhap, values.mat_khau, function (data: any) {
                        checkuser = data;
                        if (checkuser === "some thing wrong") {
                            alert("Tên đăng nhập hoặc mật khẩu không đúng");
                        } else {
                            contextValue[0].setCurrentUser(checkuser.id);
                            contextValue[1].setCurrentRole(checkuser.vai_tro);
                            localStorage.setItem("user", checkuser.id);
                            localStorage.setItem("role", checkuser.vai_tro);
                            Navigate("/");
                        }
                    });
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Field
                            id="ten_dang_nhap"
                            name="ten_dang_nhap"
                            placeholder="Tên đăng nhập"
                            validate={validate}
                        />
                        {errors.ten_dang_nhap && touched.ten_dang_nhap && (
                            <p className="error">{errors.ten_dang_nhap} </p>
                        )}
                        <Field
                            id="mat_khau"
                            name="mat_khau"
                            placeholder="Mật khẩu"
                            type="password"
                            validate={validate}
                        />
                        {errors.mat_khau && touched.mat_khau && <p className="error">{errors.mat_khau} </p>}
                        <button type="submit">Đăng nhập</button>
                        <Link to="/register">Đăng ký</Link>
                    </Form>
                )}
            </Formik>
        </LOGIN>
    );
}

export default Login;
