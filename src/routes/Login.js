import React, { useEffect } from "react";
import { useState } from "react";
import {authService, storageService} from "../fbase";
import "../css/Logincss.css";

function Login () {
    const [password, setPassword] = useState();
    const [loginimg, setLoginimg] = useState();

    const uploadimg = async () => {
        const attachmentRef = storageService.ref().child(`minji2.png`);
        setLoginimg(await attachmentRef.getDownloadURL());
    }

    useEffect(() => {
        uploadimg();
    },[]);

    const onChange = (event) => {
        const { target: {value}} = event;
        setPassword(value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

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
                    className="Loginbutton"
                    type="submit"
                    value="😊"
                    />
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;
