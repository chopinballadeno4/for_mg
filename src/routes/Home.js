import React from "react";
import { Link } from "react-router-dom";

function Home () {
    
    return (
        <div>
            <Link
            to={{
                pathname: `/name/stock`
            }}
            >dsfg</Link>
            <Link
            to={{
                pathname: `/name/date`
            }}
            >dsfg</Link>
            <Link
            to={{
                pathname: `/name/photo`
            }}
            >dsfg</Link>
            <h1>Home</h1>
        </div>
    );
}

export default Home;