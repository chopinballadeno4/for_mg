import React, { useEffect } from "react";
import { useState } from "react";
import {authService, storageService, dbService} from "../fbase";
import "../css/Logincss.css";
import { useNavigate } from "react-router-dom";

function Login () {
    const [password, setPassword] = useState();
    const [loginimg, setLoginimg] = useState();
    const Navigate = useNavigate();

    const uploadimg = async () => {
        const attachmentRef = storageService.ref().child(`minji2.png`);
        setLoginimg(await attachmentRef.getDownloadURL());
    }

    const moveHome = () => {
        Navigate("/123");
    }

    const onChange = (event) => {
        const { target: {value}} = event;
        setPassword(value);   
    }

    const onSubmit = async (event) => {
        //event.preventDefault();
        const users = await dbService.collection("user").get();
        let userID;
        let islogin;
        users.forEach((document) => {
            const userPW = document.data().PW;
            if(userPW === password) {
                userID = document.data().ID;
                islogin = true;
            }
        });
        console.log(userID);
        console.log(islogin);
        if(islogin) {
            moveHome();
        } else {
            console.log("wrong user");
        }
    };

    useEffect(() => {
        uploadimg();
    },[]);

    return (
        <>
        <div className="TD">
            <div className="d1">
                <img 
                className="Loginimg"
                src={loginimg}
                >
                </img>
            </div>
            <div className="d2">
                <form onSubmit={onSubmit}>
                    <input 
                    className="Logininput"
                    type="text"
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={onChange}
                    required
                    >
                    </input>
                    <input 
                    className="Loginsubmit"
                    type="submit" 
                    value="💗"
                    >
                    </input>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;
