import { faHome, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Getuserbyid } from "../../API/userAPI";
import { AppContext } from "../../App";

const NABBAR = styled.div`
    background-color: #8f92a8;
    padding-bottom: 1rem;
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 999;
    .nab-content {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 1rem 1rem 0 1rem;
        .home-button {
            text-decoration: none;
            color: #000;
            font-family: "Trebuchet MS", Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
        }
    }
    .user-info {
        position: relative;
        display: inline-block;
        .drop-content {
            width: 250px;
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            padding: 12px 16px;
            .tag {
                text-decoration: none;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 0.5rem 0.5rem 0 0;
                color: #657ef8;
                border-bottom: 1px solid #f1f4f9;
                display: block;
                :hover {
                    background-color: #e6e9f0;
                    border-radius: 0.5rem;
                }
            }
        }
        :hover .drop-content {
            display: block;
        }
    }
`;

function Nabbar() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
    const [Info, setInfo] = useState<any>([]);
    useEffect(() => {
        Getuserbyid(CurrentUser, (data: any) => {
            setInfo(data);
        });
    }, [CurrentUser]);
    return (
        <NABBAR>
            <div className="nab-content">
                <Link to={"/"} className="home-button">
                    <FontAwesomeIcon icon={faHome} />
                    &#160; KTechLAB
                </Link>
                {Info.length > 0 ? (
                    <div className="user-info">
                        Xin chào: {Info[0].ten}&#160;
                        <FontAwesomeIcon icon={faUser} />
                        <div className="drop-content">
                            <Link to={"/userinfo/" + CurrentUser} className="tag">
                                <FontAwesomeIcon icon={faUser} /> Thông tin cá nhân
                            </Link>
                            <a
                                href="/"
                                className="tag"
                                onClick={() => {
                                    localStorage.clear();
                                }}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
                            </a>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </NABBAR>
    );
}
export default Nabbar;
