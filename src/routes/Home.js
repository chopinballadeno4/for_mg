import "../css/Homecss.css";
import React from "react";
import { Link, useParams} from "react-router-dom";
import { useRecoilState } from "recoil";
import { username } from "../atoms";
import Todo from "../components/Todo";

function Home () {
    const { userId } = useParams();
    const [ user, setUser] = useRecoilState(username);
    console.log("Home mount !");

    return (
        <div class="Home">
            <header className="Home_header">
                <Link
                to={{
                    pathname: `/${userId}/stock`
                }}> 
                    <button>
                        💵 
                    </button>
                </Link>
            </header>
            <main className="Home_Todo">
                <Todo/>
            </main>
        </div>
    );
}

export default Home;