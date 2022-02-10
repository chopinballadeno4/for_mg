import React from "react";
import {authService} from "../fbase";

function createID() {
    authService.createUserWithEmailAndPassword("ming","777");   
}


function Login () {
    return (
        <div>
            <h1>
                Login {createID}
            </h1>
        </div>
    );
}

export default Login;
