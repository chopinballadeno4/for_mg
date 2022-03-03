import React, { useEffect } from "react";
import { useState } from "react";
import {authService, storageService, dbService} from "../fbase";
import "../css/Logincss.css";
import { useNavigate } from "react-router-dom";
import { Shake } from 'reshake';

function Login () {
    const [password, setPassword] = useState();
    const [loginimg, setLoginimg] = useState();
    const [iswrongPW, setiswrongPW] = useState(false);
    const Navigate = useNavigate();

    const uploadimg = async () => {
        const attachmentRef = storageService.ref().child(`minji2.png`);
        setLoginimg(await attachmentRef.getDownloadURL());
    }

    const moveHome = (userID) => {
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
                <form onSubmit={onSubmit}
                className="d2form"
                >
                    <div
                    className="Loginmsg"
                    >
                        <input 
                        className="Logininput"
                        type="password"
                        placeholder="비밀번호를 입력해 주세요."
                        value={password}
                        onChange={onChange}
                        autoFocus
                        required
                        ></input>
                        <Shake 
                        className="Loginspan"
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
                    </div>
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
