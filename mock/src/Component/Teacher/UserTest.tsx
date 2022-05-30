import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { getTestresult } from "../../API/classAPI";

const TEST = styled.div`
    background-color: #fff;
    min-height: 100vh;
    position: relative;
    padding: 1rem;
    width: 100%;
    h2 {
        text-align: center;
        padding: 0 0 1rem 0;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        thead {
            font-weight: bold;
            text-transform: uppercase;
            color: #fff;
            background-color: #00a8ff;
            tr {
                th {
                    padding: 1rem;
                }
            }
        }
        tbody {
            tr {
                :nth-child(even) {
                    background-color: #f2f2f2;
                }
                :nth-child(odd) {
                    background-color: #fff;
                }
                td {
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    padding: 1rem;
                }
            }
        }
    }
`;

const UserTest = () => {
    const test_id: any = useParams<any>().id;
    const [Testresult, setTestresult] = useState<any>([]);
    useEffect(() => {
        getTestresult(test_id, (data: any) => {
            setTestresult(data);
        });
    }, [test_id]);
    return (
        <TEST>
            <h2>Thống kê điểm</h2>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Điểm</th>
                        <th>Ngày giờ làm bài</th>
                    </tr>
                </thead>
                <tbody>
                    {Testresult.map((item: any, index: any) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.ten}</td>
                                <td>{item.ket_qua}</td>
                                <td>{item.ngay_lam}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </TEST>
    );
};
export default UserTest;
