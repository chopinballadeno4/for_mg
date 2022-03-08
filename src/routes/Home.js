import React from "react";
import { Link, useParams} from "react-router-dom";

function Home () {
    const { userId } = useParams();

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