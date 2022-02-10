import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";

const AppRouter = () => {
    return(  
        <BrowserRouter> 
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/123" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;