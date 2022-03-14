import React, { useEffect, useState } from "react";
import { username } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { dbService } from "../fbase";
import moment from "moment";

function Consume () {
    const [ user, setUser ] = useRecoilState(username);
    const [ todayuse, setTodayuse ] = useState([]);
    const [ month, setMonth ] = useState(moment().format('M'));
    const [ fbmonth, setFbmonth ] = useState("");
    const [ day, setDay ] = useState(moment().format('D'));
    const [ item, setItem ] = useState("");
    const [ value , setValue ] = useState(0);

    useEffect(() => {
        setFbmonth(checkmonth(moment().format('M')));
    },[]);

    const checkmonth = (month) => {
        switch(month) {
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
        //await dbService.collection()

    }

    const addItem = () => {
        if(item==="" || value==="") {
            return;
        }
        todayuse.push({
            item: item,
            value: value,
        })
        console.log(todayuse);
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