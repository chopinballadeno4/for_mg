import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/stockcss.css";

function Stock() {
    const navigate = useNavigate();
    
    const onClick = (event) => {
        navigate(-1);
    }

    return(
        <div className="TD">
            <div>
                <button
                className="Tap_button"
                type="button"
                onClick={onClick}
                >
                <img src="/image/back_button_arrow.png" alt="back_button"/>
                </button>
            </div>
        </div>
    );
}

export default Stock;