import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";

const AppRouter = ({isLoggedIn}) => {
    return(  
        <BrowserRouter> 
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/:id" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;