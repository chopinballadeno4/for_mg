import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Chart from "../components/Chart";
import { username } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Consume from "../components/Consume";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../css/Stockcss.css";
import { dbService } from "../fbase";

function Stock() {
    //const [ monthday, setMonthday ] = useState(0); // 그달이 몇일까지 있는지
    const [ fbmonth, setFbmonth ] = useState(""); // March, April 등..
    const [ uselist, setUselist ] = useState([]);
    const navigate = useNavigate();
    moment.locale('ko');
    const localizer = momentLocalizer(moment);
    const user = useRecoilValue(username);

    const onClick = () => {
        navigate(-1);
    }

    const checkmonth = (month) => {
        switch(Number(month)) {
            case 1: return "January";
            case 2: return "February";
            case 3: return "March";
            case 4: return "April";
            case 5: return "May";
            case 6: return "June";
            case 7: return "July";
            case 8: return "August";
            case 9: return "September";
            case 10: return "October";
            case 11: return "November";
            case 12: return "December";
        } 
    }

    useEffect(async () => {
        console.log("Stock Mount !!!");
        setFbmonth((prevState) => { return checkmonth(moment().format('M')) });
        console.log(fbmonth);
        const data = await dbService.collection(fbmonth).get();
        data.forEach((document) => {
            if(document.id !=="Totaluse") {
                document.data()
            }
        });
    },[]);

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
                <Consume />
            </div>
        </div>
    );
}

export default Stock;