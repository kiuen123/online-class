import { Formik, Form } from "formik";
import JoditEditor from "jodit-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { AddPostComment, DelPostComment, GetPostComment, GetPostDetail } from "../../API/postAPI";
import { AppContext } from "../../App";

const POSTDETAIL = styled.div`
    background-color: #fff;
    padding: 1rem;
    min-height: 100vh;
    .addcmt {
        width: 100%;
        display: inline-block;
        text-decoration: none;
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
    .postlist {
        padding: 1rem;
        margin-right: 1rem;
        .post {
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            overflow: hidden;
            h2 {
                text-align: center;
                font-size: 24px;
            }
            .post-content {
                padding: 0 1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            button,
            a {
                display: inline-block;
                text-decoration: none;
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
                width: 15%;
                text-align: center;
            }
            * {
                font-size: 16px;
                margin: 1rem 0;
            }
            .date {
                float: right;
            }
        }
    }
    .mainContent {
        margin-bottom: 1rem;
        border: 1px solid #f1f4f9;
        border-radius: 0.5rem;
        padding: 1rem;
        h3 {
            text-align: center;
        }
        div {
            padding: 1rem 0;
        }
        i {
            display: block;
            text-align: right;
        }
    }
    .post-content {
        padding: 0 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cmt {
        border: 1px solid #f1f4f9;
        border-radius: 0.5rem;
        padding: 1rem;
        .usercmt {
            display: flex;
            align-items: center;
            img {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                margin-right: 1rem;
            }
            a {
                text-decoration: none;
            }
        }
        div {
            padding: 1rem 0;
        }
        i {
            display: block;
            text-align: right;
        }
    }
    .error {
        color: red;
        background-color: #fff;
    }
`;

function PostDetail() {
    const contextValue = useContext(AppContext);
    var CurrentUser: number = contextValue[0].CurrentUser;
    const post_id: any = useParams<any>().id;
    const [PostContent, setPostContent] = useState<any>([]);
    const [PostComment, setPostComment] = useState<any>([]);
    const [ngviet, setNgviet] = useState<any>();

    useEffect(() => {
        GetPostDetail(post_id, (data: any) => {
            setPostContent(data);
        });
    }, [post_id]);

    useEffect(() => {
        GetPostComment(post_id, (data: any) => {
            setPostComment(data);
        });
    }, [post_id]);

    useEffect(() => {
        if (PostContent.length > 0) {
            setNgviet(PostContent[0].nguoi_viet);
        }
    }, [PostContent]);

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

    // nôi dung của bài đang viết
    const [EditorContent, setEditorContent] = useState<any>();
    const editor = useRef<any>();
    const config = {
        readonly: false,
    };

    return (
        <POSTDETAIL>
            {PostContent.map((item: any) => {
                return (
                    <div key={item.id}>
                        <div className="mainContent">
                            <h3>{item.ten_bai_viet}</h3>
                            <hr />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.noi_dung.replace(/(<? *script)/gi, "illegalscript"),
                                }}
                                className="post-content"
                            ></div>
                            <i>{item.ngay_dang}</i>
                        </div>
                        <div className="postlist">
                            <Formik
                                initialValues={{
                                    post_id: item.id,
                                    nguoi_viet: CurrentUser,
                                    noi_dung: ``,
                                    ngay_dang: datetime,
                                }}
                                onSubmit={(values) => {
                                    AddPostComment(
                                        values.post_id,
                                        values.nguoi_viet,
                                        EditorContent,
                                        values.ngay_dang,
                                        (data: any) => {}
                                    );
                                    GetPostComment(post_id, (data: any) => {
                                        setPostComment(data);
                                    });
                                    values.noi_dung = "";
                                }}
                            >
                                {() => (
                                    <Form>
                                        <JoditEditor
                                            ref={editor}
                                            value={EditorContent}
                                            config={config}
                                            onBlur={(newContent) => setEditorContent(newContent)}
                                        />
                                        <button type="submit" className="addcmt">
                                            Thêm comment
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                );
            })}

            {PostComment.map((item: any) => {
                return (
                    <div key={item.id} className="cmt">
                        <div className="usercmt">
                            <img src={item.anh_dai_dien} alt="" />
                            <Link to={"/userinfo/" + item.nguoi_viet}>{item.ten}</Link>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.noi_dung.replace(/(<? *script)/gi, "illegalscript"),
                            }}
                            className="post-content"
                        ></div>
                        <i>{item.ngay_dang}</i>
                        {item.nguoi_viet === CurrentUser || ngviet === CurrentUser ? (
                            <button
                                onClick={() =>
                                    DelPostComment(item.id, (data: any) => {
                                        GetPostComment(post_id, (data: any) => {
                                            setPostComment(data);
                                        });
                                    })
                                }
                                className="addcmt"
                            >
                                Xóa comment
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            })}
        </POSTDETAIL>
    );
}

export default PostDetail;
