import { useEffect, useState } from "react";
import styled from "styled-components";
import Getallusercount, {
    Getalladmincount,
    getClassCount,
    getCmtCount,
    getPostCount,
    getStudentCount,
    getTeacherCount,
} from "../../API/adminAPI";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

ChartJS.register(ArcElement, Tooltip, Legend);

const DASHBROAD = styled.div`
    background-color: #fff;
    min-height: 100vh;
    padding: 1rem;
    a {
        text-decoration: none;
        color: #000;
        :hover {
            color: #657ef8;
        }
    }
    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        border-bottom: 1px solid #e5e5e5;
    }
    .user {
        display: flex;
        justify-content: space-between;
        .chart {
            width: 400px;
            height: 400px;
        }
        .thongso {
        }
    }
`;

function Dashbroad() {
    const [usercount, setusercount] = useState<any>([]);
    useEffect(() => {
        Getallusercount((data: any) => {
            setusercount(data);
        });
    }, []);

    const [admincount, setadmincount] = useState<any>([]);
    useEffect(() => {
        Getalladmincount((data: any) => {
            setadmincount(data);
        });
    }, []);

    const [studentcount, setstudentcount] = useState<any>([]);
    useEffect(() => {
        getStudentCount((data: any) => {
            setstudentcount(data);
        });
    }, []);

    const [teachercount, setteachercount] = useState<any>([]);
    useEffect(() => {
        getTeacherCount((data: any) => {
            setteachercount(data);
        });
    }, []);

    const [classcount, setclasscount] = useState<any>([]);
    useEffect(() => {
        getClassCount((data: any) => {
            setclasscount(data);
        });
    }, []);

    const [postcount, setpostcount] = useState<any>([]);
    useEffect(() => {
        getPostCount((data: any) => {
            setpostcount(data);
        });
    }, []);

    const [cmtcount, setcmtcount] = useState<any>([]);
    useEffect(() => {
        getCmtCount((data: any) => {
            setcmtcount(data);
        });
    }, []);

    return (
        <DASHBROAD>
            <Link to={"/quanliuser"} className="tag">
                <h2>
                    Xem thông tin người dùng <FontAwesomeIcon icon={faArrowCircleRight} />
                </h2>
            </Link>

            <div className="user">
                <div className="thongso">
                    {usercount.map((item: any) => {
                        return <p>Tổng số người dùng: {item.number}</p>;
                    })}
                    <p>Trong đó</p>
                    {admincount.map((item: any) => {
                        return <p>&emsp;&emsp;Tổng số admin: {item.number}</p>;
                    })}
                    {studentcount.map((item: any) => {
                        return <p>&emsp;&emsp;Tổng số học sinh: {item.number}</p>;
                    })}
                    {teachercount.map((item: any) => {
                        return <p>&emsp;&emsp;Tổng số giáo viên: {item.number}</p>;
                    })}
                </div>
                <div className="chart">
                    {admincount.map((itemadmin: any) => {
                        return (
                            <>
                                {studentcount.map((itemstudent: any) => {
                                    return (
                                        <>
                                            {teachercount.map((itemteacher: any) => {
                                                const data = {
                                                    labels: ["Admin", "Student", "Teacher"],
                                                    datasets: [
                                                        {
                                                            label: "# of Votes",
                                                            data: [
                                                                itemadmin.number,
                                                                itemstudent.number,
                                                                itemteacher.number,
                                                            ],
                                                            backgroundColor: [
                                                                "rgba(255, 99, 132, 0.2)",
                                                                "rgba(54, 162, 235, 0.2)",
                                                                "rgba(255, 206, 86, 0.2)",
                                                            ],
                                                            borderColor: [
                                                                "rgba(255, 99, 132, 1)",
                                                                "rgba(54, 162, 235, 1)",
                                                                "rgba(255, 206, 86, 1)",
                                                            ],
                                                            borderWidth: 1,
                                                        },
                                                    ],
                                                };
                                                return (
                                                    <>
                                                        <Pie data={data} />
                                                    </>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </>
                        );
                    })}
                </div>
            </div>

            <Link to={"/quanliclass"} className="tag">
                <h2>
                    Xem thông tin các lớp <FontAwesomeIcon icon={faArrowCircleRight} />
                </h2>
            </Link>
            <div className="class">
                <div className="thongso">
                    {classcount.map((item: any) => {
                        return <p>Tổng số lớp: {item.number}</p>;
                    })}
                </div>
                <div className="chart"></div>
            </div>

            <Link to={"/quanlipost"} className="tag">
                <h2>
                    Quản lí bài viết <FontAwesomeIcon icon={faArrowCircleRight} />
                </h2>
            </Link>
            <div className="post">
                {postcount.map((item: any) => {
                    return <p>Tổng số bài viết: {item.number}</p>;
                })}
            </div>
            <Link to={"/quanlicmt"} className="tag">
                <h2>
                    Quản lí bình luận <FontAwesomeIcon icon={faArrowCircleRight} />
                </h2>
            </Link>
            <div className="cmt">
                {cmtcount.map((item: any) => {
                    return <p>Tổng số bình luận: {item.number}</p>;
                })}
            </div>
        </DASHBROAD>
    );
}
export default Dashbroad;
