import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../routes/Login";
import Stock from "../routes/Stock";
import Home from "../routes/Home";

const AppRouter = () => {
    return(  
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/:userId" element={<Home/>} />
                <Route path="/:userId/Stock" element={<Stock/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;