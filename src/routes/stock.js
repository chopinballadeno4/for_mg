import React from "react";
import "../css/stockcss.css";

function Stock() {
    return(
        <div className="TD">
            <div>
                <button
                className="Tap_button"
                type="button">
                <img src="/image/back_button_arrow.png" alt="back_button"/>
                </button>
            </div>
        </div>
    );
}

export default Stock;