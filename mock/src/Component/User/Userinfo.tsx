import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { CarePost, delCare, GetPostbyUser, GetUserCarePost } from "../../API/postAPI";
import { Getuserbyid } from "../../API/userAPI";
import { AppContext } from "../../App";

const CONTENT = styled.div`
    background-color: #ffffff;
    min-height: 100vh;
    padding: 1rem;
    width: 100%;
    .postlist {
        padding: 1rem;
        background-color: #fff;
        margin-right: 1rem;
        .post {
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            button {
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
            p {
                font-size: 16px;
                margin: 1rem 0;
            }
            i {
                float: right;
            }
        }
    }
    a {
        text-decoration: none;
    }
    img {
        width: 300px;
        height: 300px;
        margin-right: 1rem;
    }
    .frist {
        display: flex;
    }
    .tag {
        display: inline-block;
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #657ef8;
        max-width: 250px;
        img {
            width: 100%;
            margin-top: 1rem;
        }
    }
    .class {
        width: 100%;
    }
    .notthing {
        font-size: 16px;
        padding: 1rem;
    }
`;

function Userinfo() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
    const Iduser: any = useParams<any>().id;
    const [Info, setInfo] = useState<any>([]);
    const [postlist, setpostlist] = useState([]);
    const [carepost, setcarepost] = useState([]);

    useEffect(() => {
        Getuserbyid(Iduser, (data: any) => {
            setInfo(data);
        });
    }, [Iduser]);

    useEffect(() => {
        GetPostbyUser(Iduser, (data: any) => {
            setpostlist(data);
        });
    }, [Iduser]);

    useEffect(() => {
        GetUserCarePost(Iduser, (data: any) => {
            setcarepost(data);
        });
    }, [Iduser]);

    return (
        <CONTENT>
            {Info.map((item: any) => {
                return (
                    <div className="frist" key={item.id}>
                        <img src={item.anh_dai_dien} alt="" />
                        <div className="info">
                            <p>Tên: {item.ten}</p>
                            <p>Email: {item.email}</p>
                            <p>Tóm tắt: {item.tom_tat}</p>
                            {item.id === CurrentUser ? (
                                <div>
                                    <Link to={"/changeavatar"} className="tag">
                                        Sửa ảnh đại diện
                                    </Link>
                                    <Link to={"/editinfo"} className="tag">
                                        Sửa thông tin
                                    </Link>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                );
            })}
            <div className="class">
                <h2>Bài viết đã đăng</h2>
                <div className="postlist">
                    {postlist.length === 0 ? (
                        <p>Chưa có bài viết nào</p>
                    ) : (
                        postlist.map((item: any) => {
                            return (
                                <div key={item.id} className="post">
                                    <h2>{item.ten_bai_viet}</h2>
                                    <hr />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: item.noi_dung.replace(/(<? *script)/gi, "illegalscript"),
                                        }}
                                        className="post-content"
                                    ></div>
                                    <Link to={"/post/" + item.id}>Xem chi tiết</Link>
                                    <button
                                        onClick={() =>
                                            CarePost(Iduser, item.id, (data: any) => {
                                                GetUserCarePost(Iduser, (data: any) => {
                                                    setcarepost(data);
                                                });
                                            })
                                        }
                                    >
                                        Quan tâm
                                    </button>
                                    <i className="date">{item.ngay_dang}</i>
                                </div>
                            );
                        })
                    )}
                </div>
                <h2>Bài viết bạn quan tâm</h2>
                <div className="postlist">
                    {carepost.length === 0 ? (
                        <p>Chưa quan tâm bài viết nào</p>
                    ) : (
                        carepost.map((item: any) => {
                            return (
                                <div key={item.id} className="post">
                                    <h2>{item.ten_bai_viet}</h2>
                                    <hr />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: item.noi_dung.replace(/(<? *script)/gi, "illegalscript"),
                                        }}
                                        className="post-content"
                                    ></div>
                                    <Link to={"/post/" + item.id}>Xem chi tiết</Link>
                                    <button
                                        onClick={() =>
                                            delCare(Iduser, item.id, (data: any) => {
                                                GetUserCarePost(Iduser, (data: any) => {
                                                    setcarepost(data);
                                                });
                                            })
                                        }
                                    >
                                        Bỏ quan tâm
                                    </button>
                                    <i className="date">{item.ngay_dang}</i>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </CONTENT>
    );
}

export default Userinfo;
