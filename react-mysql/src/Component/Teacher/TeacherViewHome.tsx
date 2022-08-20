/* eslint-disable array-callback-return */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Getuserteachclass } from "../../API/userAPI";
import { AppContext } from "../../App";
import { faChalkboardTeacher, faPlus } from "@fortawesome/free-solid-svg-icons";

const TEACHERVIEWHOME = styled.div`
    height: 92vh;
    width: 100%;
    background-color: #fff;
    padding: 1rem;
    .class {
        display: flex;
        flex-wrap: wrap;
        height: 40vh;
        overflow-y: auto;
        p {
            padding: 1rem;
        }
        .tag {
            max-width: 350px;
            text-align: center;
            display: inline-block;
            padding: 1rem;
            margin: 0.5rem;
            border-radius: 0.5rem;
            height: 3.5rem;
            width: 100%;
            font-size: 16px;
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
`;

function TeacherViewHome() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;

    // danh sách lớp học của student
    const [classlist, setclasslist] = useState([]);
    useEffect(() => {
        Getuserteachclass(CurrentUser, (data: any) => {
            setclasslist(data);
        });
    }, [CurrentUser]);

    var currentdate = new Date();

    return (
        <TEACHERVIEWHOME>
            <h2>Lớp bạn đang dạy</h2>
            <div className="class">
                <Link to="/createclass" className="tag">
                    <FontAwesomeIcon icon={faPlus} /> Tạo lớp mới
                </Link>
                {classlist.length > 0 ? (
                    <>
                        {classlist.map((item: any) => {
                            if (
                                Date.parse(item.ngay_ket_thuc.split("/").reverse().join("/")) >
                                Date.parse(
                                    currentdate.getFullYear() +
                                        "/" +
                                        (currentdate.getMonth() + 1) +
                                        "/" +
                                        currentdate.getDate()
                                )
                            )
                                return (
                                    <Link to={"/class/" + item.id} key={item.id} className="tag">
                                        <FontAwesomeIcon icon={faChalkboardTeacher} /> {item.ten_lop}
                                    </Link>
                                );
                        })}
                    </>
                ) : (
                    <p>Bạn chưa dạy lớp nào</p>
                )}
            </div>
            <h2>Lớp bạn đã dạy</h2>
            <div className="class">
                {classlist.length > 0 ? (
                    <>
                        {classlist.map((item: any) => {
                            if (
                                Date.parse(item.ngay_ket_thuc.split("/").reverse().join("/")) <
                                Date.parse(
                                    currentdate.getFullYear() +
                                        "/" +
                                        (currentdate.getMonth() + 1) +
                                        "/" +
                                        currentdate.getDate()
                                )
                            )
                                return (
                                    <Link to={"/class/" + item.id} key={item.id} className="tag">
                                        <FontAwesomeIcon icon={faChalkboardTeacher} /> {item.ten_lop}
                                    </Link>
                                );
                        })}
                    </>
                ) : (
                    <p>Chưa có lớp nào kết thúc</p>
                )}
            </div>
        </TEACHERVIEWHOME>
    );
}
export default TeacherViewHome;
