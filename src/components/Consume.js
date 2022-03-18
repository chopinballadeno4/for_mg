import "../css/Stockcss.css";
import React, { useEffect, useState } from "react";
import { username } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { dbService } from "../fbase";
import moment from "moment";
import { traverseTwoPhase } from "react-dom/cjs/react-dom-test-utils.production.min";

function Consume () {
    const [ user, setUser ] = useRecoilState(username);
    const [ todayuse, setTodayuse ] = useState([]);
    const [ monthday, setMonthday ] = useState(0);
    const [ fbmonth, setFbmonth ] = useState("");
    const [ day, setDay ] = useState(moment().format('D'));
    const [ item, setItem ] = useState("");
    const [ value , setValue ] = useState(0);
    const [ totalvalue, setTotalvalue ] = useState(0);
    const [ balance, setBalance ] = useState(0);

    useEffect(async () => {
        await setFbmonth(checkmonth(moment().format('M')));
        await setMonthday(checkday(moment().format('M')));
        setBalance(await (await dbService.collection("balance").doc("balance").get()).data().money);
        // this is promise??
    },[]);

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

    const checkday = (month) => {
        switch(Number(month)) {
            case 1: return 31;
            case 2: return 28;
            case 3: return 31;
            case 4: return 30;
            case 5: return 31;
            case 6: return 30;
            case 7: return 31;
            case 8: return 31;
            case 9: return 30;
            case 10: return 31;
            case 11: return 30;
            case 12: return 31;
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection(fbmonth).add({
            day: day,
            items: todayuse,
            totalvalue: totalvalue,
        });
        alert("등록완료 !");

    }

    const addItem = async () => {
        if(item==="" || value==="") {
            return;
        }
        todayuse.push({
            item: item,
            value: value,
        });
        setTotalvalue(Number(totalvalue)+Number(value));
        alert("추가완료 !");
    }

    const itemChange = (event) => {
        const { target: {value}} = event;
        setItem(value);
    }

    const valueChange = (event) => {
        const { target: {value}} = event;
        setValue(value);
    }
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const onSubmitTotal = async (event) => {
        event.preventDefault();
        await dbService.collection("balance").doc("balance").update({
            money: Number(balance),
        });
        alert("등록완료 !");
    }

    const balanceChange = (event)  => {
        const { target: {value}} = event;
        setBalance(value);
    }

    return(
        <div className="consume">
            { user==="ming" ? 
            <>
            <form
            onSubmit={onSubmit}
            >
                <input
                type="text"
                value={item}
                onChange={itemChange}
                placeholder="소비명"
                >
                </input>
                <input
                type="text"
                value={value}
                onChange={valueChange}
                placeholder="소비가격"
                >
                </input>
                <input
                type="submit"
                >
                </input>
            </form>
            <button
                onClick={addItem}
            >
                ➕➕➕➕➕
            </button>
            <form
            onSubmit={onSubmitTotal}
            >
                <input
                type="text"
                value={balance}
                onChange={balanceChange}
                placeholder="소비가격"
                >
                </input>
                <input
                type="submit"
                >
                </input>
            </form>
            </>
             : null}
            <span>&nbsp;&nbsp;&nbsp;이번달 사용한 금액: 000000 💸</span>
            <br/>
            <span>&nbsp;&nbsp;&nbsp;이번달 남은&nbsp;&nbsp;&nbsp; 금액: {balance.toLocaleString('ko-KR')} 💰</span>
            <br/>
            <span>&nbsp;&nbsp;&nbsp;이번달 남은&nbsp;&nbsp;&nbsp; 일수: {monthday-day} 📆</span>
        </div>
    );
}

export default Consume;