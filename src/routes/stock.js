import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Chart from "../components/Chart";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../css/Stockcss.css";

function Stock() {
    const navigate = useNavigate();
    moment.locale('ko');
    const localizer = momentLocalizer(moment);
    
    const onClick = () => {
        navigate(-1);
    }

    return(
        <div className="stock">
            <div className="stock-tap">
                <button
                className="stock-tap-button"
                type="button"
                onClick={onClick}
                >
                <img src="/image/back_button_arrow.png" alt="back_button"/>
                </button>
            </div>
            <div className="stock-main">
                <div className="stock-main-calendar">
                    <Calendar
                    toolbar={false}
                    localizer={localizer}
                    style={{ height: 500 }}
                    startAccessor="start"
                    endAccessor="end"
                    />
                </div>
                <div className="stock-main-chart">
                    {/* <Chart/> */}
                </div>
            </div> 
            <div className="stock-bottom">
                <span>이번달 사용한 금액: 000000 💰</span>
                <span>이번달 남은   금액: 000000 💰</span>
                <span>이번달 남은   일수: 000000 💰</span>
            </div>
        </div>
    );
}

export default Stock;