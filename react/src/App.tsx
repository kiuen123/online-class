import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./Component/Home/Login";
import Register from "./Component/Home/Register";
import Userinfo from "./Component/User/Userinfo";
import Createclass from "./Component/Class/Createclass";
import Joinclass from "./Component/Class/Joinclass";
import EditUserInfo from "./Component/User/EditUserInfo";
import PostDetail from "./Component/Class/PostDetail";
import Changeavatar from "./Component/User/Changeavatar";
import Dashbroad from "./Component/Admin/Dashbroad";
import Quanliuser from "./Component/Admin/Quanliuser";
import Quanliclass from "./Component/Admin/Quanliclass";
import Quanlipost from "./Component/Admin/Quanlipost";
import Quanlicmt from "./Component/Admin/Quanlicmt";
import Addtest from "./Component/Class/Addtest";
import StudentViewHome from "./Component/Student/StudentViewHome";
import TeacherViewHome from "./Component/Teacher/TeacherViewHome";
import Nabbar from "./Component/Home/Nabbar";
import StudentViewClass from "./Component/Student/StudentViewClass";
import TeacherViewClass from "./Component/Teacher/TeacherViewClass";
import StudentViewTest from "./Component/Student/StudentViewTest";
import TeacherViewTest from "./Component/Teacher/TeacherViewTest";
import UserTest from "./Component/Teacher/UserTest";
import UpdateTest from "./Component/Teacher/UpdateTest";

const APP = styled.div`
    font-size: 16px;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
`;

const CONTENT = styled.div`
    width: 100%;
    position: relative;
`;

export const AppContext = createContext<any>(null);

function App() {
    const [CurrentUser, setCurrentUser] = useState<number>(-1);
    useEffect(() => {
        if (localStorage.user !== undefined) {
            setCurrentUser(parseInt(localStorage.user));
        }
    }, []);

    const [CurrentRole, setCurrentRole] = useState<number>(-1);
    useEffect(() => {
        if (localStorage.role !== undefined) {
            setCurrentRole(parseInt(localStorage.role));
        }
    }, []);

    return (
        <APP>
            <BrowserRouter>
                <AppContext.Provider
                    value={[
                        { CurrentUser, setCurrentUser },
                        { CurrentRole, setCurrentRole },
                    ]}
                >
                    {CurrentUser !== -1 ? <Nabbar /> : null}
                    <CONTENT>
                        <Routes>
                            {/* home */}
                            <Route
                                path="/"
                                element={
                                    CurrentUser !== -1 ? (
                                        <>
                                            {CurrentRole === 1 ? (
                                                <Dashbroad />
                                            ) : (
                                                <>
                                                    {CurrentRole === 2 ? (
                                                        <StudentViewHome />
                                                    ) : (
                                                        <>{CurrentRole === 3 ? <TeacherViewHome /> : <Login />}</>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <Login />
                                    )
                                }
                            />
                            {/* login regis */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            {/* user */}
                            <Route path="/userinfo/:id" element={CurrentUser === -1 ? <Login /> : <Userinfo />} />
                            <Route path="/editinfo" element={CurrentUser === -1 ? <Login /> : <EditUserInfo />} />
                            <Route path="/changeavatar" element={CurrentUser === -1 ? <Login /> : <Changeavatar />} />
                            {/* class */}
                            <Route path="/createclass" element={CurrentUser === -1 ? <Login /> : <Createclass />} />
                            <Route path="/joinclass" element={CurrentUser === -1 ? <Login /> : <Joinclass />} />
                            <Route path="/usertest/:id" element={CurrentUser === -1 ? <Login /> : <UserTest />} />
                            <Route path="/updatetest/:id" element={CurrentUser === -1 ? <Login /> : <UpdateTest />} />
                            <Route
                                path="/class/:id"
                                element={
                                    CurrentUser !== -1 ? (
                                        CurrentRole === 2 ? (
                                            <StudentViewClass />
                                        ) : CurrentRole === 3 ? (
                                            <TeacherViewClass />
                                        ) : null
                                    ) : null
                                }
                            />
                            <Route path="/post/:id" element={CurrentUser === -1 ? <Login /> : <PostDetail />} />
                            <Route path="/addtest/:classid" element={CurrentUser === -1 ? <Login /> : <Addtest />} />
                            <Route
                                path="/test/:id"
                                element={
                                    CurrentUser !== -1 ? (
                                        CurrentRole === 2 ? (
                                            <StudentViewTest />
                                        ) : CurrentRole === 3 ? (
                                            <TeacherViewTest />
                                        ) : null
                                    ) : null
                                }
                            />
                            {/* admin */}
                            <Route
                                path="/dashbroad"
                                element={CurrentUser !== -1 && CurrentRole === 1 ? <Dashbroad /> : <Login />}
                            />
                            <Route
                                path="/quanliuser"
                                element={CurrentUser !== -1 && CurrentRole === 1 ? <Quanliuser /> : <Login />}
                            />
                            <Route
                                path="/quanliclass"
                                element={CurrentUser !== -1 && CurrentRole === 1 ? <Quanliclass /> : <Login />}
                            />
                            <Route
                                path="/quanlipost"
                                element={CurrentUser !== -1 && CurrentRole === 1 ? <Quanlipost /> : <Login />}
                            />
                            <Route
                                path="/quanlicmt"
                                element={CurrentUser !== -1 && CurrentRole === 1 ? <Quanlicmt /> : <Login />}
                            />
                            {/* 404 */}
                            <Route path="*" element={CurrentUser === -1 ? <></> : <></>} />
                        </Routes>
                    </CONTENT>
                </AppContext.Provider>
            </BrowserRouter>
        </APP>
    );
}

export default App;
