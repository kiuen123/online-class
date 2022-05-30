import { toUpper } from "lodash";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getTest } from "../../API/classAPI";

const TEACHERVIEWTEST = styled.div`
    background-color: #fff;
    min-height: 100vh;
    padding: 1rem;
    position: relative;
    .cauhoi {
        border: 1px solid #ccc;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        width: 100%;
        p {
            font-size: 1.2rem;
            padding: 0.5rem;
        }
        label {
            margin-right: 0.5rem;
            font-size: 1.2rem;
            padding: 0.5rem;
        }
    }
    h2 {
        text-align: center;
        padding: 0 0 1rem 0;
    }
    .dapan {
        font-weight: bold;
    }
`;

function TeacherViewTest() {
    const test_id: any = useParams<any>().id;
    const [cauhoi, setcauhoi] = useState<any>([]);
    const [noidung, setnoidung] = useState<any>([]);
    const [tenbaikt, settenbaikt] = useState<string>("");
    useEffect(() => {
        getTest(test_id, (data: any) => {
            setcauhoi(data);
        });
    }, [test_id]);
    useEffect(() => {
        if (cauhoi.length > 0) {
            setnoidung(JSON.parse(cauhoi[0].noi_dung));
            settenbaikt(cauhoi[0].ten_bai_kiem_tra);
        }
    }, [cauhoi]);

    return (
        <TEACHERVIEWTEST>
            <h2>{tenbaikt}</h2>
            <div className="preview">
                {noidung.map((item: any) => {
                    return (
                        <div key={item.cau_hoi} className="cauhoi">
                            <p>Câu hỏi: {item.cau_hoi}</p>
                            <p>Đáp án A: {item.a}</p>
                            <p>Đáp án B: {item.b}</p>
                            <p>Đáp án C: {item.c}</p>
                            <p>Đáp án D: {item.d}</p>
                            <p className="dapan">Đáp án đúng: {toUpper(item.dap_an_dung)}</p>
                        </div>
                    );
                })}
            </div>
        </TEACHERVIEWTEST>
    );
}
export default TeacherViewTest;
