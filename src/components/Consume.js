import "../css/Stockcss.css";
import React, { useEffect, useState } from "react";
import { username } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { dbService } from "../fbase";
import moment from "moment";

function Consume () {
    const user = useRecoilValue(username);
    const [ todayuselist, setTodayuselist ] = useState([]); // 구매 리스트
    const [ monthday, setMonthday ] = useState(0); // 그달이 몇일까지 있는지
    const [ fbmonth, setFbmonth ] = useState(""); // March, April 등..
    const [ day, setDay ] = useState(moment().format('D')); // 오늘 몇일인지
    const [ balance, setBalance ] = useState(0); // 통장 잔고
    const [ todayuse, setTodayuse ] = useState(0); // 하루 사용금액
    const [ monthuse, setMonthuse ] = useState(0); // 한달 사용금액
    const [ item, setItem ] = useState(""); // 구매 이름
    const [ value , setValue ] = useState(0); // 구매 가격


    useEffect(async () => {    
        await setFbmonth(checkmonth(moment().format('M')));
        await setMonthday(checkday(moment().format('M')));
        await setDay(moment().format('D'));
        // this is promise??
        setBalance(await (await dbService.collection("balance").doc("balance").get()).data().money);
        setMonthuse(await (await dbService.collection(fbmonth).doc("Totaluse").get()).data().money);
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
            items: todayuselist,
            todayuse: todayuse,
        });
        await dbService.collection(fbmonth).doc("Totaluse").update({
            money: monthuse+todayuse,
        });
        await dbService.collection("balance").doc("balance").update({
            money: balance-todayuse,
        });
        alert("등록완료 !");
    }

    const addItem = async () => {
        if(item==="" || value==="") {
            return;
        }
        // 해결과제 - push 말고 useState 사용해서 .. !
        todayuselist.push({
            item: item,
            value: value,
        });
        setTodayuse(Number(todayuse)+Number(value));
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
            <span>&nbsp;&nbsp;&nbsp;이번달 사용한 금액: {monthuse.toLocaleString('ko-KR')} 💸</span>
            <br/>
            <span>&nbsp;&nbsp;&nbsp;이번달 남은&nbsp;&nbsp;&nbsp; 금액: {balance.toLocaleString('ko-KR')} 💰</span>
            <br/>
            <span>&nbsp;&nbsp;&nbsp;이번달 남은&nbsp;&nbsp;&nbsp; 일수: {monthday-day} 📆</span>
        </div>
    );
}

export default Consume;