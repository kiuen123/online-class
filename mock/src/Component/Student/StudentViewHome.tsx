/* eslint-disable array-callback-return */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Getuserlearnclass } from "../../API/userAPI";
import { AppContext } from "../../App";
import { faChalkboardTeacher, faPlus } from "@fortawesome/free-solid-svg-icons";
const STUDENTVIEWHOME = styled.div`
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

function StudentViewHome() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;

    // danh sách lớp học của student
    const [learnlist, setlearnlist] = useState([]);
    useEffect(() => {
        Getuserlearnclass(CurrentUser, (data: any) => {
            setlearnlist(data);
        });
    }, [CurrentUser]);

    var currentdate = new Date();

    return (
        <STUDENTVIEWHOME>
            <h2>Lớp bạn đang tham gia</h2>
            <div className="class">
                <Link to="/joinclass" className="tag">
                    <FontAwesomeIcon icon={faPlus} /> Tham gia lớp
                </Link>
                {learnlist.length > 0 ? (
                    <>
                        {learnlist.map((item: any) => {
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
                    <p>Bạn chưa tham gia lớp nào</p>
                )}
            </div>
            <h2>Lớp bạn đã tham gia</h2>
            <div className="class">
                {learnlist.length > 0 ? (
                    <>
                        {learnlist.map((item: any) => {
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
        </STUDENTVIEWHOME>
    );
}
export default StudentViewHome;
