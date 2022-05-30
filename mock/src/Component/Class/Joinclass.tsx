import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GetClassByName, JoinClass } from "../../API/classAPI";
import { Getuserlearnclass, Getuserteachclass } from "../../API/userAPI";
import { AppContext } from "../../App";

const REGISTER = styled.div`
    background-color: #fff;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    a {
        background-color: #fff;
        text-decoration: none;
        text-align: center;
        :hover {
            background-color: #657ef8;
            color: #fff;
            font-weight: bold;
        }
    }
    Form {
        padding: 1rem;
        display: flex;
        margin: 0 auto;
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
    }
    .list-result {
        h2 {
            display: block;
            text-align: center;
        }
        .tag {
            text-align: center;
            display: inline-block;
            padding: 1rem;
            margin: 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid #657ef8;
            max-width: 250px;
            img {
                width: 100%;
                margin: 1rem 0;
            }
            button {
                font-size: 16px;
                padding: 0.5rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
                width: 100%;
                background-color: #f1f4f9;
                text-decoration: none;
                border: none;
                :focus {
                    background-color: #657ef8;
                }
                :hover {
                    color: #fff;
                    background-color: #657ef8;
                    font-weight: bold;
                }
            }
        }
    }
`;

function Joinclass() {
    const contextValue = useContext(AppContext);
    const Navigate = useNavigate();
    var Info: number = contextValue[0].CurrentUser;
    const [learnlist, setlearnlist] = useState([]);
    useEffect(() => {
        GetClassByName("", (data: any) => {
            setlearnlist(data);
        });
    }, []);
    
    const join = (id: number, class_id: number) => {
        JoinClass(class_id, id, (data: any) => {});
        Getuserlearnclass(Info, (data: any) => {});
        Getuserteachclass(Info, (data: any) => {});
        Navigate("/");
        window.location.reload();
    };

    return (
        <REGISTER>
            <Formik
                initialValues={{
                    ten_lop: ``,
                }}
                onSubmit={(values) => {
                    GetClassByName(values.ten_lop, (data: any) => {
                        setlearnlist(data);
                    });
                }}
            >
                {({ values }) => (
                    <Form>
                        <Field
                            id="ten_lop"
                            name="ten_lop"
                            placeholder="Tên lớp"
                            onChange={(e: any) => {
                                values.ten_lop = e.target.value;
                                GetClassByName(e.target.value, (data: any) => {
                                    setlearnlist(data);
                                });
                            }}
                        />
                        <button type="submit">Tìm lớp</button>
                    </Form>
                )}
            </Formik>
            <div className="list-result">
                <h2>Kết quả tìm kiếm</h2>
                {learnlist.map((item: any) => {
                    return (
                        <div key={item.id} className="tag">
                            <p>Lớp: {item.ten_lop}</p>
                            <p>Tên giáo viên: {item.ten}</p>
                            <img src={item.anh_dai_dien} alt="" />
                            <button
                                onClick={() => {
                                    join(Info, item.id);
                                }}
                            >
                                Tham gia
                            </button>
                        </div>
                    );
                })}
            </div>
        </REGISTER>
    );
}

export default Joinclass;
