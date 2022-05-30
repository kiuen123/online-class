import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllUser } from "../../API/adminAPI";

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

function Quanliuser() {
    const [user, setuser] = useState<any>([]);
    useEffect(() => {
        getAllUser((data: any) => {
            setuser(data);
        });
    }, []);
    return (
        <DASHBROAD>
            <h2>Danh sách người dùng</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên đăng nhập</th>
                        <th>Họ tên</th>
                        <th>Vai trò</th>
                        <th>Ảnh đại diện</th>
                        <th>Email</th>
                        <th>Tóm tắt</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((item: any) => {
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.ten_dang_nhap}</td>
                                <td>{item.ten}</td>
                                <td>{item.ten_vai_tro}</td>
                                <td>
                                    <img src={item.anh_dai_dien} alt="" />
                                </td>
                                <td>{item.email}</td>
                                <td>{item.tom_tat}</td>
                                <td className="act">
                                    <Link to={"/userinfo/" + item.id}>Xem</Link>
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
export default Quanliuser;
