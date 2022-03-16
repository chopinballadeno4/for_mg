import React, { useEffect, useState } from "react";
import { username } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { dbService } from "../fbase";
import moment from "moment";
import { traverseTwoPhase } from "react-dom/cjs/react-dom-test-utils.production.min";

function Consume () {
    const [ user, setUser ] = useRecoilState(username);
    const [ todayuse, setTodayuse ] = useState([]);
    const [ month, setMonth ] = useState(moment().format('M'));
    const [ fbmonth, setFbmonth ] = useState("");
    const [ day, setDay ] = useState(moment().format('D'));
    const [ item, setItem ] = useState("");
    const [ value , setValue ] = useState(0);
    const [ totalvalue, setTotalvalue ] = useState(0);

    useEffect(async () => {
        await setFbmonth(checkmonth(moment().format('M')));
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

    return(
        <div className="TD"
        style={{
            display: "flex",
        }}>
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
            placeholder="OK"
            >
            </input>
        </form>
        <button
            onClick={addItem}
        >
            ➕➕➕➕➕
        </button>
        </div>
    );
}

export default Consume;