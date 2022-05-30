import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EditUser, Getuserbyid } from "../../API/userAPI";
import { AppContext } from "../../App";

const REGISTER = styled.div`
    background-color: #fff;
    min-height: 100vh;
    div {
        display: flex;
        justify-content: center;
    }

    Form {
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
function validateEmail(value: any) {
    let error;
    if (!value) {
        error = "Không được để trống ô này -_-";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Thông tin không hợp lệ";
    }
    return error;
}

function validate(value: any) {
    let error;
    if (!value) {
        error = "Không được để trống ô này -_-";
    } else if (!/[A-Z0-9._%+-]$/i.test(value)) {
        error = "Thông tin không hợp lệ";
    } else if (value.length < 4) {
        error = "Thông tin phải có ít nhất 4 kí tự";
    }
    return error;
}

function EditUserInfo() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;

    const [Info, setInfo] = useState<any>([]);
    useEffect(() => {
        Getuserbyid(CurrentUser, (data: any) => {
            setInfo(data);
        });
    }, [CurrentUser]);

    return (
        <REGISTER>
            {Info.map((item: any) => {
                return (
                    <div key={item.id}>
                        <Formik
                            initialValues={{
                                email: item.email,
                                ten: item.ten,
                                tom_tat: item.tom_tat,
                            }}
                            onSubmit={(values) => {
                                EditUser(CurrentUser, values.email, values.ten, values.tom_tat, (data: any) => {});
                                window.location.reload();
                            }}
                        >
                            {({ errors, touched, values }) => (
                                <Form>
                                    <Field id="email" name="email" placeholder="Email" validate={validateEmail} />
                                    {errors.email && touched.email && <p className="error">{errors.email}</p>}
                                    <Field id="ten" name="ten" placeholder="Họ và tên" validate={validate} />
                                    {errors.ten && touched.ten && <p className="error">{errors.ten}</p>}
                                    <Field id="tom_tat" name="tom_tat" placeholder="Tóm tắt" />
                                    <button type="submit">Cập nhật</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                );
            })}
        </REGISTER>
    );
}

export default EditUserInfo;
