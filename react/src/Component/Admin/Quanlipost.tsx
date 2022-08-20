import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAlPost } from "../../API/adminAPI";
import { delCarePost, deleteCommentbyPost, delpost } from "../../API/postAPI";

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

function Quanlipost() {
    const [postinfo, setpostinfo] = useState<any>([]);
    useEffect(() => {
        getAlPost((data: any) => {
            setpostinfo(data);
        });
    }, []);
    return (
        <DASHBROAD>
            <h2>Danh sách bài viết</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên người viết</th>
                        <th>Tên lớp</th>
                        <th>Tên bài viết</th>
                        <th>Nội dung</th>
                        <th>Ngày đăng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {postinfo.map((item: any) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <td>{item.ten_lop}</td>
                                <td>{item.ten_bai_viet}</td>
                                <td className="act">
                                    <Link to={"/post/" + item.id}>Xem</Link>
                                </td>
                                <td>{item.ngay_dang}</td>
                                <td className="act">
                                    <button
                                        onClick={() =>
                                            deleteCommentbyPost(item.id, (data: any) => {
                                                delCarePost(item.id, (data: any) => {
                                                    delpost(item.id, (data: any) => {
                                                        getAlPost((data: any) => {
                                                            setpostinfo(data);
                                                        });
                                                    });
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
export default Quanlipost;
