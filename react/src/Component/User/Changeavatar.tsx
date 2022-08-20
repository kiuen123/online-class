/* eslint-disable jsx-a11y/alt-text */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Getuserbyid } from "../../API/userAPI";
import { AppContext } from "../../App";

const REGISTER = styled.div`
    background-color: #fff;
    min-height: 100vh;
    div {
        display: flex;
        justify-content: center;
    }
    .info {
        display: block;
    }
    Form {
        width: 80%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
        button,
        input,
        .info,
        p {
            font-size: 16px;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            width: 100%;
            background-color: #f1f4f9;
            text-decoration: none;
            border: none;
        }
        button {
            background-color: #657ef8;
            color: #000000;
            :hover {
                color: #fff;
                font-weight: bold;
            }
        }
        .info {
            width: 100%;
            display: flex;
            .text {
                display: block;
            }
            img {
                background-color: #fff;
                width: 100%;
                max-width: 300px;
                height: 100%;
                .imgshow {
                    background-color: #fff;
                }
            }
        }
    }
`;

function Changeavatar() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
    const [Info, setInfo] = useState<any>([]);
    const [selectedFile, setSelectedFile] = useState<any>();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [image, setImage] = useState({ preview: "", data: "" });
    const [status, setStatus] = useState("");

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        };
        setImage(img);
    };
    useEffect(() => {
        Getuserbyid(CurrentUser, (data: any) => {
            setInfo(data);
        });
    }, [CurrentUser]);

    return (
        <REGISTER>
            {Info.map((item: any) => {
                return (
                    <div key={item.id} className="all">
                        <form
                            encType="multipart/form-data"
                            onSubmit={async (e: any) => {
                                e.preventDefault();
                                let formData = new FormData();
                                formData.append("file", image.data);
                                const response = await fetch(
                                    "http://localhost:5000/uploadfile/" + item.ten_dang_nhap,
                                    {
                                        method: "POST",
                                        body: formData,
                                    }
                                );
                                if (response) setStatus(response.statusText);
                            }}
                        >
                            <input type="file" name="file" accept=".png,.jpg,.jepg" onChange={changeHandler} />
                            {isFilePicked ? (
                                <div className="info">
                                    <div className="text">
                                        <p>Tên file: {selectedFile.name}</p>
                                        <p>Loại file: {selectedFile.type}</p>
                                    </div>
                                    {image.preview && <img src={image.preview} />}
                                </div>
                            ) : (
                                <p>Chọn file để thấy thông tin</p>
                            )}
                            <button type="submit">Sửa ảnh</button>
                            {status && (
                                <h4>
                                    {status === "OK"
                                        ? "Thay ảnh đại diện thành công"
                                        : "Có lỗi xuất hiện xin hãy thử lại"}
                                </h4>
                            )}
                        </form>
                    </div>
                );
            })}
        </REGISTER>
    );
}

export default Changeavatar;
