import React from "react";
import { Link, useParams} from "react-router-dom";
import { useRecoilState } from "recoil";
import { username } from "../atoms";

function Home () {
    const { userId } = useParams();
    const [ user, setUser] = useRecoilState(username);
    console.log(user + "!!!");

    return (
        <div>
            <Link
            to={{
                pathname: `/${userId}/stock`
            }}
            >잔고</Link>
            <Link
            to={{
                pathname: `/${userId}/date`
            }}
            >데이트</Link>
            <Link
            to={{
                pathname: `/${userId}/photo`
            }}
            >포토</Link>
            <h1>Home</h1>
        </div>
    );
}

export default Home;