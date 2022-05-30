import { useState, useEffect } from "react";
import styled from "styled-components";
import { AdmingetAllComment } from "../../API/adminAPI";
import { DelPostComment } from "../../API/postAPI";

const DASHBROAD = styled.div`
    background-color: #fff;
    min-height: 100vh;
    padding: 1rem;
    h2 {
        text-align: center;
        margin-bottom: 1rem;
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
                    padding: 1rem;
                }
            }
        }
        .act {
            display: flex;
            flex-direction: column;
            button,a {
                background-color: #00a8ff;
                color: #000;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                border: none;
                margin-bottom: 0.5rem;
                text-decoration: none;
                text-align: center;
                font-size: 1rem;
                :hover {
                    background-color: #fff;
                    color: #00a8ff;
                    font-weight: bold;
            }
        }
    }
    img {
        width: 100px;
        height: 100px;
    }
`;

function Quanlicmt() {
    const [cmt, setcmt] = useState<any>([]);
    useEffect(() => {
        AdmingetAllComment((data: any) => {
            setcmt(data);
        });
    }, []);
    return (
        <DASHBROAD>
            <h2>Danh sách bình luận</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người viết</th>
                        <th>Nội dung</th>
                        <th>Ngày viết</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {cmt.map((item: any) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <td>{item.noi_dung}</td>
                                <td>{item.ngay_dang}</td>
                                <td className="act">
                                    <button
                                        onClick={() =>
                                            DelPostComment(item.id, (data: any) => {
                                                AdmingetAllComment((data: any) => {
                                                    setcmt(data);
                                                });
                                            })
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </DASHBROAD>
    );
}
export default Quanlicmt;
