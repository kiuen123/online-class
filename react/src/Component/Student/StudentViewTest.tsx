/* eslint-disable array-callback-return */
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTest, luuketqua, tangluotlambai } from "../../API/classAPI";
import { AppContext } from "../../App";

const STUDENTVIEWCLASS = styled.div`
    background-color: #fff;
    min-height: 100vh;
    padding: 1rem;
    position: relative;
    .cauhoi {
        p {
            font-size: 1.2rem;
            padding: 0.5rem;
        }
        label {
            margin-right: 0.5rem;
            font-size: 1.2rem;
            padding: 0.5rem;
        }
        .tatcadapan {
            padding: 0 1rem;
            .dapan {
                padding: 0.5rem;
            }
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 0.5rem;
        }
    }
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
    .hide {
        display: none;
    }
    .show {
        display: block;
    }
    .tomtat {
        width: 50%;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        * {
            padding: 0.5rem;
            text-align: center;
            p {
                margin-bottom: 0.5rem;
            }
        }
    }
    h2 {
        font-size: 1.2rem;
        padding: 0.5rem;
        text-align: center;
    }
    .baikiemtra {
    }
    .ketqua {
        width: 50%;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        * {
            padding: 0.5rem;
            text-align: center;
            p {
                margin-bottom: 0.5rem;
            }
        }
    }
`;

function StudentViewTest() {
    const test_id: any = useParams<any>().id;
    const [cauhoi, setcauhoi] = useState<any>([]);
    const [noidung, setnoidung] = useState<any>([]);
    const [time, setTime] = useState<number>(-1);
    const [tenbaikt, settenbaikt] = useState<string>("");
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
    useEffect(() => {
        getTest(test_id, (data: any) => {
            setcauhoi(data);
        });
    }, [test_id]);

    useEffect(() => {
        if (cauhoi.length > 0) {
            setnoidung(JSON.parse(cauhoi[0].noi_dung));
            setTime(cauhoi[0].thoi_gian_lam_bai);
            settenbaikt(cauhoi[0].ten_bai_kiem_tra);
        }
    }, [cauhoi]);
    let i = 0;
    const [answer, setAnswer] = useState<any>([]);
    const [trueasnwer, setTrueasnwer] = useState<any>([]);
    useEffect(() => {
        noidung.map((item: any) => {
            setTrueasnwer((trueasnwer: any) => [...trueasnwer, item.dap_an_dung.toLowerCase()]);
        });
    }, [noidung]);

    useEffect(() => {
        for (let j = 0; j < trueasnwer.length; j++) {
            setAnswer((answer: any) => [...answer, ""]);
        }
    }, [trueasnwer]);

    const saveanswer = (causo: number, dapan: string) => {
        answer[causo] = dapan.toLowerCase();
    };
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

    const [ketqua, setketqua] = useState<string>("");
    const checkanswer = () => {
        let check = 0;
        for (let j = 0; j < trueasnwer.length; j++) {
            if (answer[j] === trueasnwer[j]) {
                check++;
            }
        }
        setketqua(`Bạn đã trả lời đúng ${check}/${trueasnwer.length} câu hỏi, 
        điểm của bạn là ${((check / trueasnwer.length) * 10).toFixed(2)}`);
        let saveanswer = ((check / trueasnwer.length) * 10).toFixed(2);
        luuketqua(test_id, CurrentUser, parseFloat(saveanswer), datetime, (data: any) => {});
    };

    const [count, setcount] = useState<number>(-1);
    useEffect(() => {
        if (time) {
            setcount(time * 60);
        }
    }, [time]);
    const [timecount, settimecount] = useState(true);
    let intervalRef = useRef<any>();
    const decreaseNum = () => setcount((prev) => prev - 1);
    useEffect(() => {
        if (count === 0) {
            settimecount(false);
            checkanswer();
        }
        if (count < 0) {
            setcount(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    // time to show
    const [showtime, setshowtime] = useState<string>("");
    useEffect(() => {
        if (timecount) {
            let min: any = Math.floor(count / 60);
            let sec: any = count % 60;
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            setshowtime(`${min} phút ${sec} giây`);
        }
    }, [count, timecount]);

    const [show, setshow] = useState<string>("hide");
    const [show3, setshow3] = useState<string>("hide");
    const handleClose = () => {
        checkanswer();
        setcount(-1);
        setshow("hide");
        setshow3("show");
    };
    const [show2, setshow2] = useState<string>("show");
    const handleClose2 = () => {
        setshow2("hide");
    };
    const handleShow = () => {
        setshow("show");
        handleClose2();
        intervalRef.current = setInterval(decreaseNum, 1000);
        tangluotlambai(test_id, (data: any) => {});
        return () => clearInterval(intervalRef.current);
    };
    
    return (
        <STUDENTVIEWCLASS>
            <div className={"tomtat " + show2}>
                <h2>{tenbaikt}</h2>
                <p>Thời gian: {time} phút</p>
                <button onClick={handleShow}>Bắt đầu làm bài</button>
            </div>
            <div className={"baikiemtra " + show}>
                <h2>{tenbaikt}</h2>
                <div>Bài kiểm tra còn {showtime}</div>
                {noidung.map((item: any, index: number) => {
                    i++;
                    return (
                        <div className="cauhoi" key={i}>
                            <p>
                                Câu hỏi {i}: {item.cau_hoi}
                            </p>
                            <div className="tatcadapan">
                                <div className="dapan">
                                    <input
                                        type="radio"
                                        name={"" + i}
                                        id={"a" + i}
                                        onClick={() => {
                                            saveanswer(index, "a");
                                        }}
                                    />
                                    <label htmlFor={"a" + i}>A: {item.a}</label>
                                </div>
                                <div className="dapan">
                                    {" "}
                                    <input
                                        type="radio"
                                        name={"" + i}
                                        id={"b" + i}
                                        onClick={() => {
                                            saveanswer(index, "b");
                                        }}
                                    />
                                    <label htmlFor={"b" + i}>B: {item.b}</label>
                                </div>
                                <div className="dapan">
                                    <input
                                        type="radio"
                                        name={"" + i}
                                        id={"c" + i}
                                        onClick={() => {
                                            saveanswer(index, "c");
                                        }}
                                    />
                                    <label htmlFor={"c" + i}>C: {item.c}</label>
                                </div>
                                <div className="dapan">
                                    <input
                                        type="radio"
                                        name={"" + i}
                                        id={"d" + i}
                                        onClick={() => {
                                            saveanswer(index, "d");
                                        }}
                                    />
                                    <label htmlFor={"d" + i}>D: {item.d}</label>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <button onClick={handleClose}>Nộp đáp án</button>
            </div>
            <div className={"ketqua " + show3}>
                <h2>Kết quả</h2>
                <p>{ketqua}</p>
            </div>
        </STUDENTVIEWCLASS>
    );
}
export default StudentViewTest;
