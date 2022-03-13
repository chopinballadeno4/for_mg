import "../css/Logincss.css";
import React, { useEffect } from "react";
import { useState } from "react";
import {authService, storageService, dbService} from "../fbase";
import { useNavigate } from "react-router-dom";
import { Shake } from 'reshake';
import { username } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function Login () {
    const [password, setPassword] = useState();
    const [loginimg, setLoginimg] = useState();
    const [iswrongPW, setiswrongPW] = useState(false);
    const [user, setUser] = useRecoilState(username);
    const Navigate = useNavigate();

    useEffect(() => {
        uploadimg();
    },[]);

    const uploadimg = async () => {
        const attachmentRef = storageService.ref().child(`minji2.png`);
        setLoginimg(await attachmentRef.getDownloadURL());
    }

    const moveHome = async (userID) => {
        setUser(userID);
        Navigate(`/${userID}`);
   }

    const onChange = (event) => {
        const { target: {value}} = event;
        setPassword(value);  
    }

    const onSubmit = async (event) => {
        event.preventDefault();
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
        if(islogin) {
            moveHome(userID);
        } else {
            setiswrongPW(true);
        }
    };
    
    return (
        <div className="login">
            <div className="login-img">
                <img 
                src={loginimg}
                >
                </img>
            </div>
            <div className="login-form">
                <form 
                onSubmit={onSubmit}
                >
                    <div className="login-form-msg">
                        <input 
                        type="password"
                        placeholder="비밀번호를 입력해 주세요."
                        value={password || ''}
                        onChange={onChange}
                        autoFocus
                        required
                        ></input>
                        {iswrongPW ? (
                        <Shake 
                        className="Login-form-msg-error"
                        h={10}
                        v={0}
                        r={4}
                        dur={1000}
                        int={10}
                        max={100}
                        fixed={true}
                        fixedStop={false}
                        freez={false}
                        >
                            <span>wrong password !!!</span>
                        </Shake>
                        ) : (
                            null
                        )}
                    </div>
                    <input 
                    className="login-form-submit"
                    type="submit" 
                    value="💗"
                    style={{
                        cursor: "pointer",
                    }}
                    >
                    </input>
                </form>
            </div>
        </div>
    );
}

export default Login;
